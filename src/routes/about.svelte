<script>
  export let title = "About Us";
</script>

<div class="about-container">
  <h1>{title}</h1>
  <p>
    We are students of United International University, studying Computer Science and Engineering.
    Recognizing the lack of opportunities for practicing English effectively, we built this app to help users enhance their speaking skills.
  </p>
  <p>
    Our goal is to provide a free and accessible platform for everyone to prepare for IELTS speaking tests or improve their conversational English.
  </p>
  <p>
    This platform is designed with user-friendliness in mind, allowing easy access to various exercises, quizzes, and mock tests.
    Whether you're preparing for a major exam like IELTS or just aiming to improve your day-to-day English communication, our app is the perfect tool.
  </p>
</div>

<style>
  .about-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 60vh;               /* Set height to 60% of the viewport height */
    margin-bottom: 30px;        /* Add bottom margin for spacing between sections */
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  h1 {
    font-size: 1.8em;
    color: #333;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.1em;
    line-height: 1.4;            /* Decrease line height for tighter spacing */
    color: #555;
    margin-bottom: 10px;
  }
</style>
