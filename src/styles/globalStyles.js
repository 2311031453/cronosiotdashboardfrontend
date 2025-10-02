import { css } from '@emotion/react';

export const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', sans-serif;
    background-color: #f5f9f5;
    color: #333;
    line-height: 1.6;
    height: 100vh;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  html, body, #root {
    height: 100%;
  }

  /* Tambahkan style untuk link */
  a {
    text-decoration: none;
    color: inherit;
  }

  a:hover {
    text-decoration: underline;
  }

  .dashboard-container {
    padding: 24px;
    max-width: 1800px;
    margin: 0 auto;
    width: 100%;
    flex: 1;
  }

  .section-title {
    margin-bottom: 16px;
    color: #2E7D32;
    font-weight: 600;
  }

  .parameter-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }

  .chart-container {
    background: white;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 30px;
    box-shadow: 0 4px 20px 0 rgba(0,0,0,0.12);
    flex: 1;
  }

  .table-container {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 20px 0 rgba(0,0,0,0.12);
    height: 500px;
    flex: 1;
  }

  /* Responsive design */
  @media (max-width: 768px) {
    .dashboard-container {
      padding: 16px;
    }

    .parameter-grid {
      grid-template-columns: 1fr;
    }

    .chart-container,
    .table-container {
      padding: 12px;
      margin-bottom: 20px;
    }
  }

  @media (max-width: 480px) {
    .dashboard-container {
      padding: 8px;
    }
  }
`;