import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime

# Use the service account credentials from your previous code
cred = credentials.Certificate("streetcare-d0f33-firebase-adminsdk-idx6g-e46500ba2b.json")

# Initialize the app if it hasn't been initialized already
if not firebase_admin._apps:
    app = firebase_admin.initialize_app(cred)
else: 
    app= firebase_admin.get_app()

db = firestore.client()

def delete_documents_before_date(collection_name, cutoff_date):
    """
    Deletes documents from the Firestore collection that were created before the cutoff date.
    
    Parameters:
    collection_name (str): The name of the Firestore collection.
    cutoff_date (str): The cutoff date in the format 'mm-dd-yyyy'. Documents created before this date will be deleted.
    """
    try:
        # Convert cutoff_date string to a datetime object
        cutoff_datetime = datetime.strptime(cutoff_date, "%m-%d-%Y")
        
        # Reference to the collection
        collection_ref = db.collection(collection_name)
        docs = collection_ref.where('createdDate', '<', cutoff_datetime).stream()
        
        # Delete documents
        for doc in docs:
            print(f"Deleting document: {doc.id}")
            doc.reference.delete()
            
        print("Deletion complete.")
        
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    collection_to_delete = "Krupansh"
    date_input = "01-31-2024"
    
    delete_documents_before_date(collection_to_delete, date_input)