import React, { useEffect, useState } from 'react';
import {
  fetchProposals,
  fetchVoterStatus,
  castVote,
  fetchWinner
} from '../utils/ethers';

const Voting = ({ account }) => {
  const [proposals, setProposals] = useState([]);
  const [voterStatus, setVoterStatus] = useState({ voted: false, vote: null });
  const [winner, setWinner] = useState('');
  const [loading, setLoading] = useState(true);
  const [votePending, setVotePending] = useState(false);
  const [voteError, setVoteError] = useState('');
  const [voteSuccess, setVoteSuccess] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const [props, voter, win] = await Promise.all([
        fetchProposals(),
        fetchVoterStatus(account),
        fetchWinner()
      ]);
      setProposals(props);
      setVoterStatus(voter);
      setWinner(win);
    } catch (err) {
      setVoteError('Failed to fetch voting data');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (account) loadData();
    // eslint-disable-next-line
  }, [account]);

  const handleVote = async (idx) => {
    setVotePending(true);
    setVoteError('');
    setVoteSuccess('');
    try {
      await castVote(idx);
      setVoteSuccess('Vote submitted!');
      await loadData();
    } catch (err) {
      setVoteError(err.reason || err.message || 'Vote failed');
    }
    setVotePending(false);
  };

  if (!account) return null;

  return (
    <div className="voting-container">
      <h2>Voting</h2>
      {loading ? (
        <div className="loading">Loading proposals...</div>
      ) : (
        <div className="proposals">
          {proposals.map((p, idx) => (
            <div
              key={idx}
              className={`proposal-card${voterStatus.vote === idx ? ' voted' : ''}`}
            >
              <div className="proposal-title">{p.name}</div>
              <div className="proposal-votes">{p.voteCount} votes</div>
              <button
                disabled={voterStatus.voted || votePending}
                onClick={() => handleVote(idx)}
                className="vote-btn"
              >
                {voterStatus.vote === idx
                  ? 'You Voted'
                  : votePending
                  ? 'Voting...'
                  : 'Vote'}
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="winner-section">
        <strong>Current Winner:</strong> {winner || 'N/A'}
      </div>
      <div className="status-section">
        {voterStatus.voted ? (
          <span className="status voted">You have already voted.</span>
        ) : (
          <span className="status not-voted">You have not voted yet.</span>
        )}
        {voteError && <div className="error">{voteError}</div>}
        {voteSuccess && <div className="success">{voteSuccess}</div>}
      </div>
    </div>
  );
};

export default Voting;