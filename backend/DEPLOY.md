# Deploy to Render

## Prerequisites
- Cloudinary account with API credentials
- Render account (free)

## Steps

### 1. Create a Render Web Service

1. Go to [render.com](https://render.com)
2. Sign up / Log in
3. Click "New" → "Web Service"
4. Connect your GitHub repository (or use "Public Git Repository")
5. Select the repository

### 2. Configure the Service

- **Name**: `seizure-tracker-backend` (or your preferred name)
- **Environment**: `Node`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Plan**: Free

### 3. Set Environment Variables

In the Render dashboard, go to "Environment" and add:

```
CLOUDINARY_CLOUD_NAME=dvncvyys4
CLOUDINARY_API_KEY=275483649295974
CLOUDINARY_API_SECRET=hAZxZmZesqnZPaIyZGDX_Fpdp50
API_KEY=seizure_tracker_backend_key_2024_secure_random_string_12345
PORT=10000
```

### 4. Deploy

- Click "Create Web Service"
- Render will automatically deploy
- Wait for deployment to complete
- Your service URL will be: `https://{service-name}.onrender.com`

### 5. Update App Configuration

After deployment, update your app's `.env` file:

```
EXPO_PUBLIC_BACKEND_URL=https://{service-name}.onrender.com
EXPO_PUBLIC_BACKEND_API_KEY=seizure_tracker_backend_key_2024_secure_random_string_12345
```

## Local Development

### Run Backend Locally

```bash
cd backend
npm install
npm run dev
```

The backend will run on `http://localhost:3000`

### Test Video Deletion

```bash
curl -X POST http://localhost:3000/api/videos/delete \
  -H "Content-Type: application/json" \
  -H "x-api-key: seizure_tracker_backend_key_2024_secure_random_string_12345" \
  -d '{"publicId":"seizure_123","userId":"user_456"}'
```

Expected response:
```json
{"success": true, "message": "Video deleted successfully"}
```

## Notes

- The free tier on Render will spin down after 15 minutes of inactivity
- First request after spin-down may take 30 seconds
- For production, consider upgrading to a paid plan
