# API Contract

All endpoints should follow:

Success:
{
  "success": true,
  "message": "Operation successful",
  "data": {},
  "timestamp": "ISO-8601"
}

Error:
{
  "success": false,
  "message": "Error message",
  "data": null,
  "timestamp": "ISO-8601"
}

## Main endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Student concerns
- `GET /api/complaints`
- `POST /api/complaints`
- `GET /api/complaints/ai/summary` — WARDEN/ADMIN/STUDENT_COORDINATOR

### Notices
- `GET /api/notices`
- `POST /api/notices` — WARDEN/ADMIN

### Lend & Borrow
- `GET /api/community/items`
- `POST /api/community/items`
- `POST /api/community/items/:itemId/requests`

### Mess
- `GET /api/mess/reviews`
- `POST /api/mess/reviews`
- `POST /api/mess/wastage` — MESS_COORDINATOR/WARDEN/ADMIN
- `GET /api/mess/wastage/summary` — MESS_COORDINATOR/WARDEN/ADMIN
