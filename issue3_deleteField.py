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

def delete_fields(collection_name, fields_to_delete):
    """
    Deletes specified fields from all documents in the given Firestore collection.
    
 Parameters:
    collection_name (str): The name of the Firestore collection.
    fields_to_delete (list): A list of field names to delete from each document.
    """
    try:
        # Reference to the collection
        collection_ref = db.collection(collection_name)
        docs = collection_ref.stream()
        
        # Iterate through documents and delete fields
        for doc in docs:
            print(f"Updating document: {doc.id}")
            field_updates = {field: firestore.DELETE_FIELD for field in fields_to_delete}
            doc.reference.update(field_updates)
            
        print("Field deletion complete.")
        
    except Exception as e:
        print(f"An error occurred: {e}")

# Example usage:
if __name__ == "__main__":
    collection_to_update = "kp1234"
    fields_to_remove = ["city", "age_test", "location"]
    
    delete_fields(collection_to_update, fields_to_remove)