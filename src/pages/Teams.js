import React, { useState, useEffect } from 'react';
import { 
  FaUsers, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaCrown, 
  FaUserPlus,
  FaUserMinus,
  FaSearch,
  FaExchangeAlt
} from 'react-icons/fa';
import '../styles/Teams.css';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [userTeam, setUserTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form states
  const [newTeamName, setNewTeamName] = useState('');
  const [teamToJoin, setTeamToJoin] = useState('');
  const [transferEmail, setTransferEmail] = useState('');
  const [showTransferForm, setShowTransferForm] = useState(false);

  const API_BASE = 'https://summeropenreg-esbcg8bgekgrabfu.canadacentral-01.azurewebsites.net/api';

  useEffect(() => {
    const userData = localStorage.getItem('registeredUser');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
    fetchTeams();
    checkUserTeamMembership();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await fetch(`${API_BASE}/Teams`);
      if (response.ok) {
        const data = await response.json();
        setTeams(data);
      } else {
        setError('Failed to load teams');
      }
    } catch (err) {
      setError('Error loading teams');
    } finally {
      setLoading(false);
    }
  };

  const checkUserTeamMembership = async () => {
    if (!currentUser?.email) return;
    
    try {
      const response = await fetch(`${API_BASE}/Teams/user/${encodeURIComponent(currentUser.email)}/membership`);
      if (response.ok) {
        const data = await response.json();
        if (data.isInTeam) {
          setUserTeam(data.team);
        }
      }
    } catch (err) {
      console.error('Error checking team membership:', err);
    }
  };

  const createTeam = async (e) => {
    e.preventDefault();
    if (!newTeamName.trim()) return;

    try {
      const response = await fetch(`${API_BASE}/Teams`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teamName: newTeamName.trim(),
          teamLeaderEmail: currentUser.email
        }),
      });

      if (response.ok) {
        const newTeam = await response.json();
        setTeams([newTeam, ...teams]);
        setUserTeam({ teamID: newTeam.teamID, teamName: newTeam.teamName, role: 'leader' });
        setNewTeamName('');
        setShowCreateForm(false);
        setSuccess('Team created successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to create team');
      }
    } catch (err) {
      setError('Error creating team');
    }
  };

  const joinTeam = async (teamId) => {
    try {
      const response = await fetch(`${API_BASE}/Teams/${teamId}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: currentUser.email
        }),
      });

      if (response.ok) {
        const updatedTeam = await response.json();
        // Update teams list
        setTeams(teams.map(team => 
          team.teamID === teamId ? updatedTeam : team
        ));
        setUserTeam({ teamID: teamId, teamName: updatedTeam.teamName, role: 'member' });
        setSuccess('Successfully joined team!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to join team');
      }
    } catch (err) {
      setError('Error joining team');
    }
  };

  const leaveTeam = async (teamId) => {
    if (!window.confirm('Are you sure you want to leave this team?')) return;

    try {
      const response = await fetch(`${API_BASE}/Teams/${teamId}/leave`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: currentUser.email
        }),
      });

      if (response.ok) {
        setUserTeam(null);
        fetchTeams(); // Refresh to get updated member counts
        setSuccess('Successfully left team!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to leave team');
      }
    } catch (err) {
      setError('Error leaving team');
    }
  };

  const deleteTeam = async (teamId) => {
    if (!window.confirm('Are you sure you want to delete this team? This action cannot be undone.')) return;

    try {
      const response = await fetch(`${API_BASE}/Teams/${teamId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: currentUser.email
        }),
      });

      if (response.ok) {
        setTeams(teams.filter(team => team.teamID !== teamId));
        setUserTeam(null);
        setSuccess('Team deleted successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to delete team');
      }
    } catch (err) {
      setError('Error deleting team');
    }
  };

  const transferLeadership = async (e) => {
    e.preventDefault();
    if (!transferEmail.trim() || !userTeam) return;

    try {
      const response = await fetch(`${API_BASE}/Teams/${userTeam.teamID}/transfer-leadership`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentLeaderEmail: currentUser.email,
          newLeaderEmail: transferEmail.trim()
        }),
      });

      if (response.ok) {
        const updatedTeam = await response.json();
        setTeams(teams.map(team => 
          team.teamID === userTeam.teamID ? updatedTeam : team
        ));
        setUserTeam({ ...userTeam, role: 'member' });
        setTransferEmail('');
        setShowTransferForm(false);
        setSuccess('Leadership transferred successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to transfer leadership');
      }
    } catch (err) {
      setError('Error transferring leadership');
    }
  };

  const filteredTeams = teams.filter(team =>
    team.teamName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  if (loading) {
    return (
      <div className="teams-container">
        <div className="loading">Loading teams...</div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="teams-container">
        <div className="error">Please log in to manage teams.</div>
      </div>
    );
  }

  return (
    <div className="teams-page">
      <div className="container">
        <div className="teams-content">
          <div className="teams-header">
            <h1><FaUsers /> Team Management</h1>
            <p>Create, join, and manage teams for Summer Open 2025</p>
          </div>

          {/* Messages */}
          {error && (
            <div className="message error">
              {error}
              <button onClick={clearMessages} className="close-btn">×</button>
            </div>
          )}
          {success && (
            <div className="message success">
              {success}
              <button onClick={clearMessages} className="close-btn">×</button>
            </div>
          )}

          {/* User's Current Team Status */}
          <div className="current-team-status">
            {userTeam ? (
              <div className="team-status">
                <h3>Your Team: {userTeam.teamName}</h3>
                <p>Role: <span className={`role ${userTeam.role}`}>
                  {userTeam.role === 'leader' && <FaCrown />} {userTeam.role}
                </span></p>
                <div className="team-actions">
                  {userTeam.role === 'leader' ? (
                    <>
                      <button 
                        onClick={() => setShowTransferForm(true)}
                        className="btn btn-secondary"
                      >
                        <FaExchangeAlt /> Transfer Leadership
                      </button>
                      <button 
                        onClick={() => deleteTeam(userTeam.teamID)}
                        className="btn btn-danger"
                      >
                        <FaTrash /> Delete Team
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => leaveTeam(userTeam.teamID)}
                      className="btn btn-danger"
                    >
                      <FaUserMinus /> Leave Team
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="no-team">
                <p>You're not currently on a team.</p>
                <button 
                  onClick={() => setShowCreateForm(true)}
                  className="btn btn-primary"
                >
                  <FaPlus /> Create Team
                </button>
              </div>
            )}
          </div>

          {/* Transfer Leadership Form */}
          {showTransferForm && (
            <div className="modal-overlay">
              <div className="modal">
                <h3>Transfer Leadership</h3>
                <form onSubmit={transferLeadership}>
                  <div className="form-group">
                    <label>New Leader's Email:</label>
                    <input
                      type="email"
                      value={transferEmail}
                      onChange={(e) => setTransferEmail(e.target.value)}
                      required
                      placeholder="Enter team member's email"
                    />
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                      Transfer Leadership
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setShowTransferForm(false)}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Create Team Form */}
          {showCreateForm && (
            <div className="modal-overlay">
              <div className="modal">
                <h3>Create New Team</h3>
                <form onSubmit={createTeam}>
                  <div className="form-group">
                    <label>Team Name:</label>
                    <input
                      type="text"
                      value={newTeamName}
                      onChange={(e) => setNewTeamName(e.target.value)}
                      required
                      maxLength="255"
                      placeholder="Enter team name"
                    />
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                      <FaPlus /> Create Team
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setShowCreateForm(false)}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Search and Filter */}
          <div className="teams-controls">
            <div className="search-bar">
              <FaSearch />
              <input
                type="text"
                placeholder="Search teams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Teams List */}
          <div className="teams-grid">
            {filteredTeams.length === 0 ? (
              <div className="no-teams">
                {searchTerm ? 'No teams match your search.' : 'No teams created yet.'}
              </div>
            ) : (
              filteredTeams.map((team) => (
                <div key={team.teamID} className="team-card">
                  <div className="team-header">
                    <h3>{team.teamName}</h3>
                    <span className="member-count">
                      <FaUsers /> {team.memberCount} member{team.memberCount !== 1 ? 's' : ''}
                    </span>
                  </div>
                  
                  <div className="team-info">
                    <p><strong>Leader:</strong> {team.teamLeaderName}</p>
                    <p><strong>Created:</strong> {new Date(team.createdAt).toLocaleDateString()}</p>
                  </div>

                  <div className="team-members">
                    <h4>Members:</h4>
                    <ul>
                      {team.members.map((member) => (
                        <li key={member.memberID} className={`member ${member.role}`}>
                          {member.role === 'leader' && <FaCrown />}
                          {member.name}
                          <span className="member-role">({member.role})</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="team-actions">
                    {!userTeam && (
                      <button 
                        onClick={() => joinTeam(team.teamID)}
                        className="btn btn-primary"
                      >
                        <FaUserPlus /> Join Team
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;