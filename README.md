# crosscare-admin-Portal
Crosscare Admin Portal

# Running the Portal
Create a .env file containing a secret as follows:
SECRET=someSecretString

Have MongoDB installed and connect to the localhost

Run npm i to install dependecies

Run npm start to run the server on localhost:3000

# Endpoints

POST /register (This is temporary and will be removed in the future)

companyName

email

password

confirmPassword

role (Must be super admin, tenant admin, or support)

POST /login

email

password

GET /signout
