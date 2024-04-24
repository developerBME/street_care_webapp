# # Import the Firebase service
# import firebase_admin
# from firebase_admin import auth

# # Initialize the default app
# default_app = firebase_admin.initialize_app()
# print(default_app.name)  # "[DEFAULT]"

# # Retrieve services via the auth package...
# # auth.create_custom_token(...)


# firebase_admin.initialize_app(cred)

# # Initialize Firestore client
# db = firestore.client()

import firebase_admin ## As per suggestions importing once
from firebase_admin import firestore,credentials

cred = credentials.Certificate("streetcare-d0f33-firebase-adminsdk-idx6g-e46500ba2b.json")

## error checking for connection
if not firebase_admin._apps:
    app = firebase_admin.initialize_app(cred)
else: 
    app= firebase_admin.get_app()

db = firestore.client()


# users_ref = db.collection("BMEContactUs")
# docs = users_ref.stream()

# for doc in docs:
#     print(f"{doc.id} => {doc.to_dict()}")

def update_form_field(collection_name, field_name, new_field_value):
    # Reference to the specific form document
    try:
        collection = db.collection(collection_name)
        docs = collection.stream()

        for doc in docs:
            doc.reference.update({field_name:new_field_value})
    except Exception as e:
        print(f"Error occured:{e}")
   
def add_fields_to_document(collection_name, new_fields):
    try:
        collection_ref = db.collection(collection_name)
        docs = collection_ref.stream()

        for doc in docs:
            doc.reference.update(new_fields)
    except Exception as e:
        print(f"An error occured while adding fields: {e}")
        


# Example
#  usage
if __name__ == "__main__":
    # Change these values to match the form you want to update
    collection_name = "kp1234"
    field_to_update = "name_test"
    new_field_value = "test_value_after_update"
    '''new_fields_to_add = {
        'City':'cityA',
        'zip':7006
    }'''
    new_fields_to_add = {
        'name_test': 'test_value_after_update',
        'name_test_1': 'test_value_after_update_1',
        'name_test_2': 'test_value_after_update_2'
    }
    update_form_field(collection_name, field_to_update, new_field_value)
    add_fields_to_document(collection_name, new_fields_to_add)

