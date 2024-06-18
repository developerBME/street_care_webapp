import firebase_admin
from firebase_admin import credentials, firestore
from google.cloud.firestore_v1.base_query import FieldFilter
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import schedule
import time

# Use the service account credentials from your previous code
cred = credentials.Certificate("streetcare-d0f33-firebase-adminsdk-idx6g-e46500ba2b.json")

# Initialize the app if it hasn't been initialized already
if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)
else:
    firebase_admin.get_app()

db = firestore.client()

def get_emails_from_firestore(collection_name):
    """
    Retrieves all email IDs from the specified Firestore collection.

    Parameters:
    collection_name (str): The name of the Firestore collection.
    """
    try:
        emails = []
        docs = db.collection(collection_name).stream()
        for doc in docs:
            data = doc.to_dict()
            if 'email' in data:
                emails.append(data['email'])
        return emails
    except Exception as e:
        print(f"An error occurred: {e}")
        return []

def send_email(recipients):
    """
    Sends an email to the specified recipients.

    Parameters:
    recipients (list): A list of email addresses.
    """
    sender_email = "hrcentral27@gmail.com"  # Update with your sender email address
    sender_password = "xqxh jjzt hevf jxwv"  # Update with your sender email password
    subject = "Weekly Update"
    body = "This is your weekly update."

    for recipient in recipients:
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = recipient
        msg['Subject'] = subject

        msg.attach(MIMEText(body, 'plain'))
        print("hello")
        try:
            with smtplib.SMTP('smtp.gmail.com', 587) as server:
                server.starttls()
                server.login(sender_email, sender_password)
                print("trying to login")
                server.sendmail(sender_email, recipient, msg.as_string())
                print(f"Email sent to {recipient}")
        except Exception as e:
            print(f"Failed to send email to {recipient}: {e}")

def schedule_emails():
    """
    Retrieves emails from Firestore and sends them.
    """
    collection_name = "kp1234"  # Update with your Firestore collection name
    recipients = get_emails_from_firestore(collection_name)
    if recipients:
        send_email(recipients)

# Schedule the email to be sent every Monday at 9:00 AM
schedule.every().monday.at("09:00").do(schedule_emails)
#schedule.every(60).seconds.do(schedule_emails)

# Keep the script running to execute scheduled tasks
while True:
    schedule.run_pending()
    time.sleep(50)  # Sleep for 50 seconds before checking the schedule again