// import {
//   Box,
//   Container,
//   Grid,
//   Skeleton,
// } from "@mui/material";

// export default function Loading() {
//   return (
//     <main>
//       <Container maxWidth="lg">
//         <Box sx={{ py: 6 }}>
//           {/* Page title */}
//           <Skeleton
//             variant="text"
//             width="65%"
//             height={60}
//           />

//           {/* Subtitle */}
//           <Skeleton
//             variant="text"
//             width={180}
//             height={40}
//             sx={{ mb: 5 }}
//           />

//           {/* Movie count */}
//           <Skeleton
//             variant="text"
//             width={220}
//             height={30}
//             sx={{ mb: 3 }}
//           />

//           {/* Movie cards */}
//           <Grid container spacing={3}>
//             {Array.from({ length: 8 }).map((_, index) => (
//               <Grid
//                 key={index}
//                 size={{
//                   xs: 12,
//                   sm: 6,
//                   md: 4,
//                   lg: 3,
//                 }}
//               >
//                 <Box>
//                   <Skeleton
//                     variant="rectangular"
//                     width="100%"
//                     height={320}
//                   />

//                   <Skeleton
//                     variant="text"
//                     width="80%"
//                     height={30}
//                     sx={{ mt: 1 }}
//                   />

//                   <Skeleton
//                     variant="text"
//                     width="50%"
//                     height={24}
//                   />
//                 </Box>
//               </Grid>
//             ))}
//           </Grid>
//         </Box>
//       </Container>
//     </main>
//   );
// }

export default function Loading() {
  return (
    <div
      style={{
        padding: "40px",
        textAlign: "center",
      }}
    >
      Loading comparison...
    </div>
  );
}