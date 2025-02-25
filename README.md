# IMF Inventory Management

## Overview  
IMF Inventory Management is a Node.js API for managing spy gadgets, including authentication, gadget operations, and role-based access control.

## Features  
- **User Authentication**: JWT-based login & registration (Admin/Agent).  
- **Gadget Management**: CRUD operations, filtering, and status updates.  
- **Self-Destruct Mechanism**: Trigger gadget destruction with a confirmation code.  
- **Role-Based Access**: Only admins can update/delete gadgets.

## Setup  
1. Clone the repo & install dependencies:  
   ```bash
   git clone <repo_url> && cd IMF && npm install
