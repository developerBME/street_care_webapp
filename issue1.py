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

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("streetcare-d0f33-firebase-adminsdk-idx6g-e46500ba2b.json")

app = firebase_admin.initialize_app(cred)

db = firestore.client()

print(app)
print(db)

# users_ref = db.collection("BMEContactUs")
# docs = users_ref.stream()

# for doc in docs:
#     print(f"{doc.id} => {doc.to_dict()}")

def update_form_field(collection_name, field_name, new_field_value):
    # Reference to the specific form document
    collection = db.collection(collection_name)
    docs = collection.stream()

    for doc in docs:
        doc.reference.update({field_name:new_field_value})
   
def add_fields_to_document(collection_name, field_name):
    collection_ref = db.collection(collection_name)
    docs = collection_ref.stream()

    for doc in docs:
        doc.reference.update(field_name)
    


# Example
#  usage
if __name__ == "__main__":
    # Change these values to match the form you want to update
    collection_name = "kp1234"
    field_to_update = "name_test"
    new_field_value = "test_value_after_update"
    new_fields_to_add = {
        'city':'cityA',
        'zip':7006
    }

    ##update_form_field(collection_name, field_to_update, new_field_value)
    add_fields_to_document(collection_name, new_fields_to_add)