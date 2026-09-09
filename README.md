# Straight Talk Real Estate — Railway deployment

## Deploy on Railway

1. Create a new GitHub repository and upload all files from this folder.
2. Go to Railway, choose **New Project → Deploy from GitHub Repo**.
3. Select this repository.
4. Railway detects the Node.js project automatically. Leave the start command as `npm start`.
5. After deployment, open **Settings → Networking → Generate Domain**.

Your website will then be live on the generated Railway URL.

## Admin panel

Open `https://your-railway-url/admin` for the direct admin login page, or use **Admin Access** in the top-right corner.

Password: 

Choose images directly from your computer, then click **Save Changes**. The current admin setup saves apartment, gallery and contact edits in the browser where the edits are made. For shared permanent admin changes across every visitor, connect a database such as Railway Postgres in a later upgrade.
