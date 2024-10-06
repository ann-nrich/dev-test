Senior developer test
======================
This is a test for senior developers. The goal is to evaluate the candidate's skills in software development, problem-solving, and software design.

## General
You have been provided with a simple nodejs project - Crypto currency transaction processor.  
The application flow supposed to be as the following:
1. The user sends a request to `POST http://localhost:8085/api/create-transaction` with the following payload: 
```json
{
  "coin": "ETH",
  "amount": "10",
  "date": "2024-10-06T11:08:43.641Z"
}
```
2. If the requested coin is not existed in the `coin` table,  fetch its info from a remote API and save it in the `coin` table.
3. Save the transaction in the `userTransaction` table.
4. There is a transaction watcher function, if the coin usd price is less then purchase price, the transaction should be closes.
5. The user can close the transaction by sending a request to `POST http://localhost:8085/api/close-transaction` with the following payload:
```json
{
  "transactionId": "1"
}
```

## Requirements
Your goal is to detect the following problems in the code and fix them:
1. Code security.
2. DRY principle violation.
3. Performance issues.
4. Code readability.
5. Code maintainability.
6. Database and code design issues.
7. Naming.

## Tips
The code is written really bad, it hides pitfalls and bugs all over the place.
even the client api to bring the coin info is not implemented wisely. try to find better ways to use it.
You have to think like you are taking it to production, suspect that every line may have problems.  
Try to isolate the problems and fix them one by one by rewriting the code from scratch.   
The method: `transactionWatcherIfUsdValueBelowOpenRate` is disabled, enable it once you have finished implementing the rest of the code.

## Notes
When it comes to security, you can assume that the request coming from the user is always valid and safe. and the user is identified, no need for authentication or authorization, So when the user id is X assume that it is the user with id X.  
The application uses sqlite as a database, continue using it. no need to change it, you also don't need to implement an ORM, you can continue using SQL.  
You don't need to install any other packages, you can use the packages that are already installed.

# Deliverables
1. It will be great (and not must) if the code will be functioning as expected after the refactor.  
If not, please provide clean code that fix the problems as described above.
2. A list of other potential problems that you have detected in the code and were not implemented.

## Bonus
Implement in typescript.