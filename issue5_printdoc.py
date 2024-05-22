import firebase_admin
from firebase_admin import credentials, firestore

# Use the service account credentials from your previous code
cred = credentials.Certificate("path/to/your/credentials.json")

# Initialize the app if it hasn't been initialized already
if not firebase_admin._apps:
    app = firebase_admin.initialize_app(cred)
else:
    app = firebase_admin.get_app()

db = firestore.client()

def print_documents_by_field(collection_name, field_name, field_value):
    """
    Prints documents from the specified Firestore collection where the specified field name
    matches the given field value.
    
    Parameters:
    collection_name (str): The name of the Firestore collection.
    field_name (str): The field name to match for printing.
    field_value (str): The value of the field to match for printing.
    """
    try:
        # Query to find documents that match the field value
        query = db.collection(collection_name).where(field_name, "==", field_value)
        docs = query.stream()

        # Print all documents that match the query
        for doc in docs:
            print(f"Document ID: {doc.id}")
            print(f"Document data: {doc.to_dict()}")
        
    except Exception as e:
        print(f"An error occurred: {e}")

# Example usage:
if __name__ == "__main__":
    collection_name = input("Enter the collection name: ")
    field_name = input("Enter the field name: ")
    field_value = input("Enter the field value: ")
    
    print_documents_by_field(collection_name, field_name, field_value)