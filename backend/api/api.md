
API Documentation

1. Register  
- URL: /register  
- Method: POST  
- Body:  
  { "username": "string", "email": "string", "password": "string" }  
- Response:  
  { "message": "User registered successfully" }

2. Login  
- URL: /login  
- Method: POST  
- Body:  
  { "email": "string", "password": "string" }  
- Response:  
  { "token": "JWT token string" }

3. Contact  
- URL: /contact  
- Method: POST  
- Headers:  
  { "Authorization": "Bearer <token>" }  
- Body:  
  { "name": "string", "email": "string", "message": "string" }  
- Response:  
  { "message": "Message sent successfully" }

4. Subscribe  
- URL: /subscribe  
- Method: POST  
- Headers:  
  { "Authorization": "Bearer <token>" }  
- Body:  
  { "plan": "string" }  
- Response:  
  { "message": "Subscription activated", "status": "active", "start_date": "YYYY-MM-DD", "end_date": "YYYY-MM-DD" }

