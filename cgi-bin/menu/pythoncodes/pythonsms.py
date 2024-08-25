#!/usr/bin/env python3

import cgi
import cgitb
import json  # Import json for handling JSON responses
from twilio.rest import Client
import os  # Import os for handling environment variables

# Enable CGI traceback for debugging
cgitb.enable()

# Print necessary headers
print("Content-Type: application/json\n")

# Create instance of FieldStorage
form = cgi.FieldStorage()

# Get data from fields
message_body = form.getvalue('message')
recipient_number = form.getvalue('recipient_number')

def send_sms_message(message_body, to_number):
    try:
        account_sid = os.getenv('TWILIO_ACCOUNT_SID', 'SID')  # Ideally, use environment variables
        auth_token = os.getenv('TWILIO_AUTH_TOKEN', 'AUTH')
        client = Client(account_sid, auth_token)
        
        message = client.messages.create(
            body=message_body,
            from_='yourTwilioNo',
            to=to_number
        )
        
        return {
            'success': True,
            'message': 'SMS sent successfully.'
        }
    except Exception as e:
        return {
            'success': False,
            'message': f'Failed to send SMS. Error: {str(e)}'
        }

if message_body and recipient_number:
    result = send_sms_message(message_body, recipient_number)
else:
    result = {
        'success': False,
        'message': 'Missing message body or recipient number.'
    }

# Print JSON response
print(json.dumps(result))

