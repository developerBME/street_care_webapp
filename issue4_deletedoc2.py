import firebase_admin
from firebase_admin import credentials, firestore

# Use the service account credentials from your previous code
cred = credentials.Certificate("streetcare-d0f33-firebase-adminsdk-idx6g-e46500ba2b.json")

# Initialize the app if it hasn't been initialized already
if not firebase_admin._apps:
    app = firebase_admin.initialize_app(cred)
else:
    app = firebase_admin.get_app()

db = firestore.client()

def delete_document(collection_name, document_id):
    """
    Deletes a document from the specified Firestore collection using its document ID.
    
    Parameters:
    collection_name (str): The name of the Firestore collection.
    document_id (str): The ID of the document to delete.
    """
    try:
        # Reference to the document
        doc_ref = db.collection(collection_name).document(document_id)
        
        # Delete the document
        doc_ref.delete()
        
        print(f"Document {document_id} deleted successfully.")
        
    except Exception as e:
        print(f"An error occurred: {e}")

# Example usage:
if __name__ == "__main__":
    collection_to_update = "kp1234"
    document_to_delete = "123"
    
    delete_document(collection_to_update, document_to_delete)