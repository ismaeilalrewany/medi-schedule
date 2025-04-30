import React from 'react'

const AccountManagementSection = ({ isAdmin, openModal }) => (
  <section className="profile-section delete-section">
    <h3 className="text-lg font-semibold text-neutral/90 mb-1">Account Management</h3>
    <p className="section-description text-sm text-neutral/70 mb-4">Permanently delete your account and all associated data.</p>
    <button
      id="delete-account-btn"
      className={`btn bg-neutral ${isAdmin ? 'text-neutral-500' : 'text-neutral-content'} w-full mt-1 border-0`}
      onClick={() => openModal('delete')}
      disabled={isAdmin}
    >
      <span>Delete My Account</span>
      <i className="fa-solid fa-trash"></i>
    </button>
    <p className="subtle-text danger-text text-center text-xs text-neutral/60 mt-2">
      This action is permanent and cannot be undone.
    </p>
  </section>
)

export default AccountManagementSection