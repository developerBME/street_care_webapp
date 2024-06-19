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

def delete_documents_by_field(collection_name, field_name, field_value):
    """
    Deletes documents from the specified Firestore collection where the specified field name
    matches the given field value.
    
    Parameters:
    collection_name (str): The name of the Firestore collection.
    field_name (str): The field name to match for deletion.
    field_value (str): The value of the field to match for deletion.
    """
    try:
        # Query to find documents that match the field value
        query = db.collection(collection_name).where(field_name, "==", field_value)
        docs = query.stream()

        # Delete all documents that match the query
        for doc in docs:
            doc.reference.delete()
            print(f"Document {doc.id} deleted successfully.")
        
    except Exception as e:
        print(f"An error occurred: {e}")

# Example usage:

    collection_name = input("Enter the collection name: ")
    field_name = input("Enter the field name: ")
    field_value = input("Enter the field value: ")
    
    delete_documents_by_field(collection_name, field_name, field_value)