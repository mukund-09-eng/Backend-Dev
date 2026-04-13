# MongoDB Injection Practice

## Vulnerability
Using user input directly in query:
User.findOne(req.body);

## Attack Type
NoSQL Injection

## Example Attack
{
  "email": { "$ne": null },
  "password": { "$ne": null }
}

## Impact
Authentication bypass

## Fix
- Validate inputs
- Extract fields explicitly
- Avoid direct use of req.body
- Use bcrypt for password comparison