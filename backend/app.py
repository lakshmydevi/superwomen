from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

import os
import smtplib
from email.message import EmailMessage
from datetime import datetime
from zoneinfo import ZoneInfo
from email.utils import parseaddr


# =========================================================
# LOAD ENVIRONMENT VARIABLES
# =========================================================

load_dotenv()


# =========================================================
# FLASK APP
# =========================================================

app = Flask(__name__)

# Allows the frontend to communicate with this backend
CORS(app)


# =========================================================
# EMAIL CONFIGURATION
# =========================================================

SMTP_HOST = os.getenv("SMTP_HOST")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))

# Email account that SENDS the email
SENDER_EMAIL = os.getenv("SENDER_EMAIL")
SENDER_PASSWORD = os.getenv("SENDER_PASSWORD")

# Email address that receives NOVA/admin notifications
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")
# =========================================================
# BASIC EMAIL VALIDATION
# =========================================================

def is_valid_email(email):

    if not email:
        return False

    name, address = parseaddr(email)

    return (
        "@" in address
        and "." in address.split("@")[-1]
    )


# =========================================================
# SEND EMAIL TO THE PERSON WHO REQUESTED HELP
# =========================================================

# =========================================================
# SEND EMAILS
# =========================================================

def send_grievance_email(
    visitor_name,
    visitor_age,
    visitor_location,
    visitor_email,
    grievance,
    submitted_at
):

    # =====================================================
    # EMAIL TO VISITOR
    # =====================================================

    visitor_message = EmailMessage()

    visitor_message["Subject"] = "🚨 Signal Received — NOVA Has Heard You"
    visitor_message["From"] = SENDER_EMAIL
    visitor_message["To"] = visitor_email

    visitor_body = f"""
NOVA — SIGNAL RECEIVED
======================

Your request for help has been successfully received.

NOVA has received your signal.


VISITOR INFORMATION
-------------------

Name:
{visitor_name}

Age:
{visitor_age}

Location:
{visitor_location}

Email:
{visitor_email}


GRIEVANCE / REQUEST
-------------------

{grievance}


SUBMISSION INFORMATION
---------------------

Date & Time:
{submitted_at}


Your signal has been received successfully.

Thank you for reaching out to NOVA.

— NOVA
"""

    visitor_message.set_content(visitor_body)


    # =====================================================
    # EMAIL TO NOVA / ADMIN
    # =====================================================

    admin_message = EmailMessage()

    admin_message["Subject"] = "🚨 New NOVA Help Request Received"
    admin_message["From"] = SENDER_EMAIL
    admin_message["To"] = ADMIN_EMAIL

    admin_body = f"""
NOVA — NEW HELP REQUEST
=======================

A new grievance/help request has been received.


VISITOR INFORMATION
-------------------

Name:
{visitor_name}

Age:
{visitor_age}

Location:
{visitor_location}

Email:
{visitor_email}


GRIEVANCE / REQUEST
-------------------

{grievance}


SUBMISSION INFORMATION
---------------------

Date & Time:
{submitted_at}


This is an automatic notification from the NOVA system.

— NOVA Backend
"""

    admin_message.set_content(admin_body)


    # =====================================================
    # CONNECT TO EMAIL SERVER
    # =====================================================

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:

        # Secure the connection
        server.starttls()

        # Login to the sending email account
        server.login(
            SENDER_EMAIL,
            SENDER_PASSWORD
        )

        # -------------------------------------------------
        # Send email to visitor
        # -------------------------------------------------

        server.send_message(visitor_message)

        # -------------------------------------------------
        # Send notification to NOVA/admin
        # -------------------------------------------------

        server.send_message(admin_message)

    message = EmailMessage()

    # -----------------------------------------------------
    # EMAIL DETAILS
    # -----------------------------------------------------

    message["Subject"] = "🚨 Signal Received — NOVA Has Heard You"

    # The email account sending the message
    message["From"] = SENDER_EMAIL

    # IMPORTANT:
    # The email goes to the email entered by the visitor
    message["To"] = visitor_email


    # -----------------------------------------------------
    # EMAIL CONTENT
    # -----------------------------------------------------

    body = f"""
NOVA — SIGNAL RECEIVED
======================

Your request for help has been successfully received.

NOVA has received your signal.


VISITOR INFORMATION
-------------------

Name:
{visitor_name}

Age:
{visitor_age}

Location:
{visitor_location}

Email:
{visitor_email}


GRIEVANCE / REQUEST
-------------------

{grievance}


SUBMISSION INFORMATION
----------------------

Date & Time:
{submitted_at}


Your signal has been received successfully.

Thank you for reaching out to NOVA.

— NOVA
"""

    message.set_content(body)


    # -----------------------------------------------------
    # CONNECT TO EMAIL SERVER
    # -----------------------------------------------------

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:

        # Secure the connection
        server.starttls()

        # Login to the sending email account
        server.login(
            SENDER_EMAIL,
            SENDER_PASSWORD
        )

        # Send email to the visitor
        server.send_message(message)


# =========================================================
# GRIEVANCE API
# =========================================================

@app.route("/api/grievance", methods=["POST"])
def receive_grievance():

    try:

        # -------------------------------------------------
        # RECEIVE DATA FROM FRONTEND
        # -------------------------------------------------

        data = request.get_json()

        if not data:

            return jsonify({
                "success": False,
                "message": "No data received."
            }), 400


        # -------------------------------------------------
        # GET VISITOR INFORMATION
        # -------------------------------------------------

        visitor_name = str(
            data.get("name", "")
        ).strip()

        visitor_age = str(
            data.get("age", "")
        ).strip()

        visitor_location = str(
            data.get("location", "")
        ).strip()

        visitor_email = str(
            data.get("email", "")
        ).strip()

        grievance = str(
            data.get("grievance", "")
        ).strip()


        # -------------------------------------------------
        # VALIDATE NAME
        # -------------------------------------------------

        if not visitor_name:

            return jsonify({
                "success": False,
                "message": "Name is required."
            }), 400


        # -------------------------------------------------
        # VALIDATE AGE
        # -------------------------------------------------

        if not visitor_age:

            return jsonify({
                "success": False,
                "message": "Age is required."
            }), 400


        # -------------------------------------------------
        # VALIDATE LOCATION
        # -------------------------------------------------

        if not visitor_location:

            return jsonify({
                "success": False,
                "message": "Location is required."
            }), 400


        # -------------------------------------------------
        # VALIDATE EMAIL
        # -------------------------------------------------

        if not is_valid_email(visitor_email):

            return jsonify({
                "success": False,
                "message": "Please provide a valid email address."
            }), 400


        # -------------------------------------------------
        # VALIDATE GRIEVANCE
        # -------------------------------------------------

        if not grievance:

            return jsonify({
                "success": False,
                "message": "Please describe your grievance or request."
            }), 400


        # -------------------------------------------------
        # DATE AND TIME
        # -------------------------------------------------

        submitted_at = datetime.now(
            ZoneInfo("Asia/Kolkata")
        ).strftime(
            "%d %B %Y, %I:%M:%S %p IST"
        )


        # -------------------------------------------------
        # SEND EMAIL
        # -------------------------------------------------

        send_grievance_email(
            visitor_name=visitor_name,
            visitor_age=visitor_age,
            visitor_location=visitor_location,
            visitor_email=visitor_email,
            grievance=grievance,
            submitted_at=submitted_at
        )


        # -------------------------------------------------
        # SUCCESS RESPONSE
        # -------------------------------------------------

        return jsonify({
            "success": True,
            "message": "Your signal has been received."
        }), 200


    # -----------------------------------------------------
    # ERROR HANDLING
    # -----------------------------------------------------
    except Exception as error:

        import traceback

        print("\n==============================")
        print("NOVA EMAIL ERROR")
        print("==============================")
        print("ERROR:", repr(error))
        traceback.print_exc()
        print("==============================\n")

        return jsonify({
            "success": False,
            "message": "Unable to send the signal right now."
        }), 500


# =========================================================
# TEST ROUTE
# =========================================================

@app.route("/", methods=["GET"])
def home():

    return jsonify({
        "status": "online",
        "message": "NOVA backend is running."
    })


# =========================================================
# START SERVER
# =========================================================

if __name__ == "__main__":

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )
