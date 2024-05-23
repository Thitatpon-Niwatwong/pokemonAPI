// import React, { useState } from "react";
// import axios from "axios";
// import "./App.css";
// import PokemonDetails from "./components/PokemonDetails";
// import ControlPanel from "./components/ControlPanel";
// import LoadingSpinner from "./components/LoadingSpinner";
// import ErrorDisplay from "./components/ErrorDisplay";

// function App() {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const handleLoading = (isLoading) => {
//     setLoading(isLoading);
//   };

//   const handleError = (errorMessage) => {
//     setError(errorMessage);
//   };

//   return (
//     <div className="App">
//       {loading && <LoadingSpinner />}
//       {error && <ErrorDisplay message={error} />}
//       {!loading && !error && (
//         <>
//           <PokemonDetails onLoading={handleLoading} onError={handleError} />
//           <ControlPanel onLoading={handleLoading} onError={handleError} />
//         </>
//       )}
//     </div>
//   );
// }

// export default App;
