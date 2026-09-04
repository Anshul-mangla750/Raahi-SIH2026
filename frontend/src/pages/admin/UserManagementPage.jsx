import React, { useState, useEffect } from 'react';
import {
  Users,
  UserPlus,
  Shield,
  Truck,
  MapPin,
  Key,
  Copy,
  Check,
  Trash2,
  Search,
  RefreshCw,
  Eye,
  EyeOff,
  Sparkles,
  Phone,
  Mail,
  Building,
  CheckCircle2,
  X,
} from 'lucide-react';
import ApiClient from '@/lib/api';
import { toast } from 'sonner';

export const UserManagementPage = () => {
  // Directory state
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  // Creation Form state
  const [selectedRole, setSelectedRole] = useState('field_officer'); // 'field_officer' | 'transporter'
  const [name, setName] = useState('');
  const [customId, setCustomId] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [assignedDistrict, setAssignedDistrict] = useState('Kamrup Metropolitan (Guwahati)');
  const [agency, setAgency] = useState('NHIDCL Regional Division');
  const [companyName, setCompanyName] = useState('');
  const [fleetSize, setFleetSize] = useState(10);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Success Modal state for handover card
  const [credentialModalData, setCredentialModalData] = useState(null);
  const [copiedField, setCopiedField] = useState(null);

  const districtsList = [
    'Kamrup Metropolitan (Guwahati)',
    'Sonitpur (Tezpur)',
    'Cachar (Silchar)',
    'Dima Hasao (Haflong)',
    'East Khasi Hills (Shillong)',
    'West Khasi Hills (Nongstoin)',
    'Dimapur (Nagaland)',
    'Kohima (Nagaland)',
    'Imphal West (Manipur)',
    'Aizawl (Mizoram)',
    'Papum Pare (Itanagar)',
    'West Tripura (Agartala)',
  ];

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await ApiClient.getAdminUsers();
      if (res && res.success && Array.isArray(res.data)) {
        setUsers(res.data);
      } else {
        // Fallback default demo list if backend is offline
        setUsers([
          {
            id: 'demo_fo_1',
            customId: 'FO-KAMRUP-01',
            name: 'Debashis Hazarika',
            email: 'd.hazarika@nhidcl.gov.in',
            role: 'field_officer',
            phone: '+91 94350 11223',
            assignedDistrict: 'Kamrup Metropolitan (Guwahati)',
            agency: 'NHIDCL Regional Office',
            status: 'active',
            createdAt: new Date().toISOString(),
          },
          {
            id: 'demo_tr_1',
            customId: 'TR-BRAHMA-01',
            name: 'Pranab Gogoi',
            email: 'pranab@brahmaputrafleet.com',
            role: 'transporter',
            phone: '+91 98765 00003',
            companyName: 'Brahmaputra Heavy Freight Logistics',
            status: 'active',
            createdAt: new Date().toISOString(),
          },
        ]);
      }
    } catch (err) {
      toast.error('Failed to load personnel roster');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Helper to auto-generate user ID
  const handleAutoGenerateId = () => {
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    if (selectedRole === 'field_officer') {
      const distCode = assignedDistrict.slice(0, 3).toUpperCase();
      setCustomId(`FO-${distCode}-${randomSuffix}`);
    } else {
      setCustomId(`TR-NER-${randomSuffix}`);
    }
  };

  // Helper to generate strong temporary password
  const handleGeneratePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
    let gen = '';
    for (let i = 0; i < 10; i++) {
      gen += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(gen);
    setShowPassword(true);
  };

  // Switch role and update placeholders
  const handleSelectRole = (role) => {
    setSelectedRole(role);
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    if (role === 'field_officer') {
      setCustomId(`FO-KAM-${randomSuffix}`);
    } else {
      setCustomId(`TR-NER-${randomSuffix}`);
    }
  };

  // Handle Form Submit
  const handleCreatePersonnel = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error('Name and Email are required');
      return;
    }

    setIsSubmitting(true);
    const finalId = customId.trim() || (selectedRole === 'field_officer' ? `FO-${Date.now().toString().slice(-4)}` : `TR-${Date.now().toString().slice(-4)}`);
    const finalPassword = password.trim() || 'raahi2026';

    const payload = {
      name: name.trim(),
      customId: finalId,
      email: email.trim().toLowerCase(),
      phone: phone.trim() || undefined,
      password: finalPassword,
      role: selectedRole,
      assignedDistrict: selectedRole === 'field_officer' ? assignedDistrict : undefined,
      agency: selectedRole === 'field_officer' ? agency : undefined,
      companyName: selectedRole === 'transporter' ? (companyName.trim() || name.trim()) : undefined,
      fleetSize: selectedRole === 'transporter' ? Number(fleetSize) : undefined,
    };

    try {
      const res = await ApiClient.createAdminUser(payload);
      if (res && res.success) {
        toast.success(`${selectedRole === 'field_officer' ? 'Field Officer' : 'Transporter'} provisioned!`);
        
        // Show Handover Credentials Modal
        setCredentialModalData({
          name: payload.name,
          role: payload.role,
          customId: finalId,
          email: payload.email,
          phone: payload.phone || 'N/A',
          password: finalPassword,
          regionOrCompany: selectedRole === 'field_officer' ? payload.assignedDistrict : payload.companyName,
        });

        // Reset form
        setName('');
        setEmail('');
        setPhone('');
        setPassword('');
        setCompanyName('');
        handleAutoGenerateId();

        // Refresh table
        fetchUsers();
      } else {
        toast.error(res?.message || 'Failed to create user');
      }
    } catch (err) {
      toast.error('Error connecting to backend');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Delete
  const handleDeleteUser = async (id, userName) => {
    if (!window.confirm(`Are you sure you want to deactivate and remove ${userName}?`)) {
      return;
    }

    try {
      const res = await ApiClient.deleteAdminUser(id);
      if (res && res.success) {
        toast.success(`User ${userName} removed`);
        setUsers(users.filter((u) => u.id !== id && u.customId !== id));
      } else {
        toast.error(res?.message || 'Failed to delete user');
      }
    } catch (e) {
      toast.error('Error deleting user');
    }
  };

  // Copy helper
  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    toast.success(`Copied ${fieldName} to clipboard`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Copy full handover package
  const copyFullHandoverPackage = () => {
    if (!credentialModalData) return;
    const text = `RAAHI / NER LogiSmart - Official Account Credentials
Role: ${credentialModalData.role === 'field_officer' ? 'Field Officer (Mobile App)' : 'Transporter (Web Dashboard)'}
Name: ${credentialModalData.name}
Official ID: ${credentialModalData.customId}
Login Email: ${credentialModalData.email}
Temporary Password: ${credentialModalData.password}
Portal: ${credentialModalData.role === 'field_officer' ? 'Login via Raahi Mobile App' : 'https://raahi.gov.in/login'}

Please change your password upon initial sign in.`;
    copyToClipboard(text, 'Full Credentials Package');
  };

  // Filtered users
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      (u.name && u.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (u.email && u.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (u.customId && u.customId.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (u.assignedDistrict && u.assignedDistrict.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (u.companyName && u.companyName.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (filterRole === 'all') return true;
    return u.role === filterRole;
  });

  const countFieldOfficers = users.filter((u) => u.role === 'field_officer' || u.role === 'field_worker').length;
  const countTransporters = users.filter((u) => u.role === 'transporter').length;
  const countDrivers = users.filter((u) => u.role === 'driver').length;

  return (
    <div className="settings-page" style={{ paddingBottom: '60px' }}>
      {/* Page Header */}
      <div className="page-header-row">
        <div className="page-title-group">
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Users size={26} color="#059669" />
            Personnel & Role Provisioning
          </h1>
          <p>
            Manually create and provision official accounts for <strong>Field Officers</strong> and <strong>Transporters</strong>, assign login IDs and passwords, and manage active system personnel.
          </p>
        </div>

        <div className="header-widgets-group">
          <div className="info-pill-card">
            <Shield size={18} color="#059669" />
            <div className="info-pill-text">
              <span className="info-pill-primary">{countFieldOfficers} Officers</span>
              <span className="info-pill-secondary">On Ground</span>
            </div>
          </div>

          <div className="info-pill-card">
            <Truck size={18} color="#2563EB" />
            <div className="info-pill-text">
              <span className="info-pill-primary">{countTransporters} Transporters</span>
              <span className="info-pill-secondary">Active Agencies</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Provisioning Form, Right Live Table */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(340px, 440px) 1fr', gap: '24px', alignItems: 'start' }}>
        
        {/* Provisioning Form Card */}
        <div className="card" style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
          <div className="card-header" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '14px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
              <UserPlus size={18} color="#059669" />
              Provision New Personnel
            </h3>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Auto-syncs to MongoDB</span>
          </div>

          <form onSubmit={handleCreatePersonnel} style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Role Switcher Pill */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Select Role to Provision *
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', background: 'var(--bg-card-alt)', padding: '4px', borderRadius: '10px' }}>
                <button
                  type="button"
                  onClick={() => handleSelectRole('field_officer')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    background: selectedRole === 'field_officer' ? '#059669' : 'transparent',
                    color: selectedRole === 'field_officer' ? '#FFFFFF' : 'var(--text-secondary)',
                    border: 'none',
                  }}
                >
                  <Shield size={15} />
                  Field Officer
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectRole('transporter')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    background: selectedRole === 'transporter' ? '#2563EB' : 'transparent',
                    color: selectedRole === 'transporter' ? '#FFFFFF' : 'var(--text-secondary)',
                    border: 'none',
                  }}
                >
                  <Truck size={15} />
                  Transporter
                </button>
              </div>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '5px' }}>
                {selectedRole === 'field_officer'
                  ? 'Field Officers login via Raahi Mobile App for ground incidents & route inspections.'
                  : 'Transporters login via Web Dashboard to oversee fleets, routes & drivers.'}
              </p>
            </div>

            {/* Personnel Name */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                Full Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={selectedRole === 'field_officer' ? 'e.g. Debashis Hazarika' : 'e.g. Pranab Gogoi'}
                required
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  fontSize: '13px',
                  backgroundColor: 'var(--bg-input, #fff)',
                  color: 'var(--text-primary)',
                }}
              />
            </div>

            {/* Official ID & Auto-generator */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Assigned User ID / Badge ID *
                </label>
                <button
                  type="button"
                  onClick={handleAutoGenerateId}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '11px',
                    color: '#059669',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  <Sparkles size={12} />
                  Auto-Gen ID
                </button>
              </div>
              <input
                type="text"
                value={customId}
                onChange={(e) => setCustomId(e.target.value)}
                placeholder={selectedRole === 'field_officer' ? 'FO-KAM-101' : 'TR-BRAHMA-01'}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  fontSize: '13px',
                  fontFamily: 'monospace',
                  fontWeight: 600,
                  backgroundColor: 'var(--bg-card-alt)',
                  color: 'var(--text-primary)',
                }}
              />
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                The user can use either this ID or Email to log into their dashboard.
              </span>
            </div>

            {/* Email & Phone */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  Official Email *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@raahi.gov.in"
                    required
                    style={{
                      width: '100%',
                      padding: '9px 10px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      fontSize: '12px',
                      backgroundColor: 'var(--bg-input, #fff)',
                      color: 'var(--text-primary)',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  Phone Number
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 00000"
                  style={{
                    width: '100%',
                    padding: '9px 10px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    fontSize: '12px',
                    backgroundColor: 'var(--bg-input, #fff)',
                    color: 'var(--text-primary)',
                  }}
                />
              </div>
            </div>

            {/* Role Specific Fields */}
            {selectedRole === 'field_officer' ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    Assigned District
                  </label>
                  <select
                    value={assignedDistrict}
                    onChange={(e) => setAssignedDistrict(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 10px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      fontSize: '12px',
                      backgroundColor: 'var(--bg-input, #fff)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {districtsList.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    Agency / Dept
                  </label>
                  <input
                    type="text"
                    value={agency}
                    onChange={(e) => setAgency(e.target.value)}
                    placeholder="e.g. NHIDCL Regional"
                    style={{
                      width: '100%',
                      padding: '9px 10px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      fontSize: '12px',
                      backgroundColor: 'var(--bg-input, #fff)',
                      color: 'var(--text-primary)',
                    }}
                  />
                </div>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    Company / Freight Agency
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Brahmaputra Logistics"
                    style={{
                      width: '100%',
                      padding: '9px 10px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      fontSize: '12px',
                      backgroundColor: 'var(--bg-input, #fff)',
                      color: 'var(--text-primary)',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    Fleet Size
                  </label>
                  <input
                    type="number"
                    value={fleetSize}
                    onChange={(e) => setFleetSize(e.target.value)}
                    min="1"
                    style={{
                      width: '100%',
                      padding: '9px 10px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      fontSize: '12px',
                      backgroundColor: 'var(--bg-input, #fff)',
                      color: 'var(--text-primary)',
                    }}
                  />
                </div>
              </div>
            )}

            {/* Password with Generator */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Set Initial Password *
                </label>
                <button
                  type="button"
                  onClick={handleGeneratePassword}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '11px',
                    color: '#059669',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  <Key size={12} />
                  Generate Strong Password
                </button>
              </div>

              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter or generate a password (min 4 chars)"
                  style={{
                    width: '100%',
                    padding: '9px 40px 9px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    fontSize: '13px',
                    fontFamily: showPassword ? 'monospace' : 'inherit',
                    backgroundColor: 'var(--bg-input, #fff)',
                    color: 'var(--text-primary)',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Defaults to <code>raahi2026</code> if left empty.
              </span>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '12px',
                marginTop: '6px',
                fontSize: '14px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backgroundColor: selectedRole === 'field_officer' ? '#059669' : '#2563EB',
                borderColor: selectedRole === 'field_officer' ? '#059669' : '#2563EB',
                cursor: 'pointer',
              }}
            >
              {isSubmitting ? (
                <span>Provisioning Account...</span>
              ) : (
                <>
                  <UserPlus size={16} />
                  <span>Provision {selectedRole === 'field_officer' ? 'Field Officer' : 'Transporter'} Account</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Directory Card */}
        <div className="card" style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', paddingBottom: '14px', borderBottom: '1px solid var(--border-color)' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                Active Personnel Directory ({filteredUsers.length})
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                All synchronized user records across Web & Mobile platforms.
              </p>
            </div>

            <button
              onClick={fetchUsers}
              className="btn"
              style={{ padding: '6px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>
          </div>

          {/* Search & Filter Toolbar */}
          <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
              <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search by Name, ID, Email, or District..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 34px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  fontSize: '12px',
                  backgroundColor: 'var(--bg-input, #fff)',
                  color: 'var(--text-primary)',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              {['all', 'field_officer', 'transporter', 'driver', 'admin'].map((r) => (
                <button
                  key={r}
                  onClick={() => setFilterRole(r)}
                  style={{
                    padding: '6px 10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 600,
                    textTransform: 'capitalize',
                    border: '1px solid',
                    cursor: 'pointer',
                    background: filterRole === r ? 'var(--text-primary)' : 'transparent',
                    color: filterRole === r ? '#fff' : 'var(--text-secondary)',
                    borderColor: filterRole === r ? 'var(--text-primary)' : 'var(--border-color)',
                  }}
                >
                  {r.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="table-container" style={{ padding: '0 18px 18px 18px' }}>
            {loading ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                <RefreshCw size={24} className="animate-spin" style={{ margin: '0 auto 8px auto' }} />
                <span>Loading active personnel...</span>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                <Users size={32} style={{ margin: '0 auto 8px auto', opacity: 0.4 }} />
                <p>No personnel matching your criteria.</p>
              </div>
            ) : (
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Personnel</th>
                    <th>Role</th>
                    <th>Official ID</th>
                    <th>Assigned Region / Agency</th>
                    <th>Contact</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => {
                    const isOfficer = u.role === 'field_officer' || u.role === 'field_worker';
                    const isTransporter = u.role === 'transporter';
                    const isDriver = u.role === 'driver';
                    const isAdmin = u.role === 'admin';

                    const roleBadgeColor = isOfficer
                      ? { bg: '#ECFDF5', text: '#059669', label: 'Field Officer' }
                      : isTransporter
                      ? { bg: '#EFF6FF', text: '#2563EB', label: 'Transporter' }
                      : isDriver
                      ? { bg: '#FFFBEB', text: '#D97706', label: 'Driver' }
                      : { bg: '#F5F3FF', text: '#7C3AED', label: 'Admin' };

                    return (
                      <tr key={u.id || u.customId}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div
                              style={{
                                width: '34px',
                                height: '34px',
                                borderRadius: '50%',
                                background: roleBadgeColor.bg,
                                color: roleBadgeColor.text,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 700,
                                fontSize: '13px',
                              }}
                            >
                              {u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <div>
                              <strong style={{ fontSize: '13px', display: 'block', color: 'var(--text-primary)' }}>
                                {u.name}
                              </strong>
                              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                                {u.agency || u.companyName || 'Government Logistics Division'}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span
                            style={{
                              display: 'inline-block',
                              padding: '3px 8px',
                              borderRadius: '12px',
                              fontSize: '11px',
                              fontWeight: 600,
                              background: roleBadgeColor.bg,
                              color: roleBadgeColor.text,
                            }}
                          >
                            {roleBadgeColor.label}
                          </span>
                        </td>

                        <td>
                          <code
                            style={{
                              fontSize: '12px',
                              padding: '2px 6px',
                              background: 'var(--bg-card-alt)',
                              borderRadius: '4px',
                              fontWeight: 600,
                            }}
                          >
                            {u.customId || u.id}
                          </code>
                        </td>

                        <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                          {u.assignedDistrict || u.companyName || u.company || 'All NER Corridors'}
                        </td>

                        <td style={{ fontSize: '12px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <span style={{ color: 'var(--text-primary)', fontSize: '12px' }}>{u.email}</span>
                            {u.phone && <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>{u.phone}</span>}
                          </div>
                        </td>

                        <td>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '11px',
                              color: '#059669',
                              fontWeight: 600,
                            }}
                          >
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
                            Active
                          </span>
                        </td>

                        <td style={{ textAlign: 'right' }}>
                          <button
                            onClick={() => handleDeleteUser(u.id || u.customId, u.name)}
                            title="Deactivate / Delete"
                            style={{
                              padding: '6px',
                              borderRadius: '6px',
                              background: 'transparent',
                              border: 'none',
                              color: 'var(--text-muted)',
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = '#EF4444')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* CREDENTIALS HANDOVER MODAL */}
      {credentialModalData && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
          }}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              maxWidth: '520px',
              width: '100%',
              padding: '28px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              position: 'relative',
              animation: 'fadeIn 0.2s ease-out',
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setCredentialModalData(null)}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                background: '#F1F5F9',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={16} />
            </button>

            {/* Header Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: credentialModalData.role === 'field_officer' ? '#ECFDF5' : '#EFF6FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: credentialModalData.role === 'field_officer' ? '#059669' : '#2563EB',
                }}
              >
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  Account Provisioned Successfully!
                </h3>
                <span style={{ fontSize: '12px', color: '#64748B' }}>
                  Handover Card for {credentialModalData.name}
                </span>
              </div>
            </div>

            <p style={{ fontSize: '13px', color: '#475569', marginBottom: '20px', lineHeight: '1.5' }}>
              The account has been created in MongoDB. Share these login credentials with the{' '}
              <strong>{credentialModalData.role === 'field_officer' ? 'Field Officer' : 'Transporter'}</strong>.
            </p>

            {/* Credential Details Box */}
            <div
              style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '14px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginBottom: '20px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Assigned Role:</span>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '6px',
                    background: credentialModalData.role === 'field_officer' ? '#D1FAE5' : '#DBEAFE',
                    color: credentialModalData.role === 'field_officer' ? '#047857' : '#1D4ED8',
                  }}
                >
                  {credentialModalData.role === 'field_officer' ? 'Field Officer (Mobile App)' : 'Transporter (Web)'}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Official Login ID:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <code style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', background: '#E2E8F0', padding: '2px 6px', borderRadius: '4px' }}>
                    {credentialModalData.customId}
                  </code>
                  <button
                    onClick={() => copyToClipboard(credentialModalData.customId, 'Login ID')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}
                  >
                    {copiedField === 'Login ID' ? <Check size={14} color="#059669" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Email Address:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>
                    {credentialModalData.email}
                  </span>
                  <button
                    onClick={() => copyToClipboard(credentialModalData.email, 'Email')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}
                  >
                    {copiedField === 'Email' ? <Check size={14} color="#059669" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Initial Password:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <code style={{ fontSize: '13px', fontWeight: 700, color: '#059669', background: '#ECFDF5', padding: '2px 6px', borderRadius: '4px' }}>
                    {credentialModalData.password}
                  </code>
                  <button
                    onClick={() => copyToClipboard(credentialModalData.password, 'Password')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}
                  >
                    {copiedField === 'Password' ? <Check size={14} color="#059669" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Dashboard Access:</span>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#0F172A' }}>
                  {credentialModalData.role === 'field_officer' ? 'Raahi Mobile App' : 'https://raahi.gov.in/login'}
                </span>
              </div>
            </div>

            {/* Copy All Button */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={copyFullHandoverPackage}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  background: '#0F172A',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                }}
              >
                {copiedField === 'Full Credentials Package' ? <Check size={16} color="#10B981" /> : <Copy size={16} />}
                <span>Copy Full Credentials Package</span>
              </button>

              <button
                onClick={() => setCredentialModalData(null)}
                style={{
                  padding: '12px 20px',
                  borderRadius: '10px',
                  background: '#E2E8F0',
                  color: '#334155',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
