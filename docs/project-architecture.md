# Project Architecture

## Domain modules

- `auth`: registration/login and JWT
- `students`: student profile, room/block information
- `hostel`: hostel/block/room data
- `complaints`: student concerns and lifecycle
- `ai`: provider abstraction, complaint classification and supervisor summaries
- `notices`: centralized announcements
- `community`: lend & borrow
- `mess`: reviews + food wastage
- `notifications`: Socket.IO/in-app notifications foundation

## Complaint lifecycle

`OPEN → ACKNOWLEDGED → IN_PROGRESS → RESOLVED`

AI is an assistive layer, not the final authority. Supervisors should be able to override category, severity and priority.

## Priority model

Store:
- `severity`
- `urgencyScore`
- `priorityScore`
- `aiProcessed`

This is better than storing only an AI-generated label because the dashboard can later sort/filter and compare AI decisions with human decisions.

## Future analytics

### Hot topics
Aggregate complaints by category + normalized topic over a time window.

### Food wastage
Store prepared quantity, served count and wasted quantity per meal. Useful metrics:
- wastage percentage = wastedKg / preparedKg × 100
- wastage per student = wastedKg / studentsServed
- weekly/monthly trend

## Security

RBAC is enforced in backend middleware. Frontend route guards are only a UX layer.
