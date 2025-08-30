const Unauthorized = ({ onLogout }) => (
  <div style={{ textAlign: "center", marginTop: "50px" }}>
    <h2>Access Denied</h2>
    <p>You don't have permission to access this page. Admin role required.</p>
    <button
      onClick={onLogout}
      style={{
        padding: "10px 20px",
        backgroundColor: "#f44336",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
      }}
    >
      Go to Login
    </button>
  </div>
);

export default Unauthorized;
