'use client';

export default function AdminPage() {
    return (
        <iframe 
            src="http://localhost:8001/models/admin.php" 
            width="100%" 
            height="800px" 
            className="admin-iframe"
            title="Admin Panel"
        />
    );
}