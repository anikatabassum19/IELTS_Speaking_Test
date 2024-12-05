<script>
// No need to import anything for navigation
</script>

<style>
  nav {
    background-color: #333;
    color: white;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-size: 1.5em;
    font-weight: bold;
  }

  ul {
    list-style: none;
    display: flex;
    gap: 20px;
    margin: 0;
    padding: 0;
  }

  li {
    display: inline;
  }

  a {
    text-decoration: none;
    color: white;
    font-size: 1em;
    transition: color 0.3s;
  }

  a:hover {
    color: #f39c12;
  }

  @media (max-width: 768px) {
    ul {
      flex-direction: column;
      gap: 10px;
    }
  }
</style>

<nav>
  <div class="logo">
    TalkSmart
  </div>
   <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/results">Results</a></li>
    <li><a href="/profile">Login/SignUp</a></li>
  </ul>
</nav>
