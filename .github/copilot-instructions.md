# GitHub Copilot Instructions

## Permission Control System

This repository uses a permission control system for GitHub Copilot workspace interactions to ensure safe and controlled AI assistance.

### Rules and Guidelines

GitHub Copilot must follow these rules when working in this repository:

1. **Explicit Permission Required**: Cannot change, create, edit, or modify any files without explicit permission in the current prompt
2. **Command Execution**: Cannot run any commands or tools without explicit permission stated in the current prompt
3. **Request-Based Permissions**: Permission must be granted for each individual request - previous permissions do not carry over
4. **Analysis Only**: Should only analyze and provide information unless specifically allowed to take action

### Status

- **Status**: ACTIVE
- **Created**: 2025-08-02
- **Description**: Permission control system for GitHub Copilot workspace interactions

### How to Grant Permissions

When interacting with GitHub Copilot in this repository, explicitly state what actions you want to allow:

- "You have permission to edit the file X"
- "You have permission to run command Y"
- "You have permission to create new files in directory Z"

### Purpose

This system ensures that:

- All changes are intentional and explicitly requested
- No unintended modifications occur during analysis or discussion
- AI assistance remains helpful while maintaining control over the codebase
- Development workflow is safe and predictable

### Project Context

This is a medical scheduling application (MediSchedule) with:

- Backend: Node.js/Express API
- Frontend: React with Vite
- Database: MongoDB
- Authentication system for admins, doctors, and patients
- Appointment management functionality

When working on this project, please consider the medical nature of the application and ensure all suggestions maintain data privacy and security standards.
