import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';

function InfoPage() {
  return (
    <Container sx={{ marginTop: '5rem' }}>
      <Typography variant="h2" sx={{ marginBottom: '2rem' }}>About</Typography>
      <Typography variant="body1" paragraph>
        This is an app that acts as a digital garage where you can easily manage and keep track of all your vehicles in one place. 
        As someone who loves cars and wants to keep track of all the details, right now I tend to keep receipts and notes in a binder, but it is becoming a little too difficult to manage.
      </Typography>
      <Typography variant="body1" paragraph>
        This application allows you to easily create an account and sign in. Once you have successfully logged in, you can access your "garage" where all of your added vehicles will be visible. To add a vehicle, simply click on the "add" button and input the make, year, model, and mileage. Additionally, you can also include any personal notes or history for each car.
      </Typography>
      <Typography variant="body1" paragraph>
        After adding your vehicle, you will be redirected to the "garage" where you can view your newly added vehicle. To access the details page, simply click on the vehicle you want to view. At the top of the page, you will find information on the make, year, model, and mileage. In the middle section, there are input fields for adding dates, descriptions, and notes. Below that, you'll see a table displaying the added history. As a user, you can monitor your car's maintenance, including oil changes and parts history. Additionally, you can keep track of your trip miles and average MPG.
      </Typography>
      <Typography variant="body1" paragraph>
        Additionally, I hope to create a feature on the details page so you can create a wishlist of modifications you'd like to add to your cars someday.
      </Typography>
      <Typography variant="body1" paragraph>
        If you no longer possess a vehicle, you can conveniently remove it from your garage through a toggle button that displays a delete option for all garage vehicles.
      </Typography>
      <Typography variant="body1" paragraph>
        This app provides a one-stop solution for storing and managing information, eliminating the need for multiple papers lying around. Whether you're a car enthusiast or simply someone who wants to keep track of their vehicles, this app is ideal.
      </Typography>

      <Typography variant="h2" sx={{ marginBottom: '2rem' }}>Technologies Used</Typography>
      <List>
        <ListItem>
          <ListItemText primary="React" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Redux Saga" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Javascript/HTML" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Material UI" />
        </ListItem>
        <ListItem>
          <ListItemText primary="SweetAlert2" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Node.js" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Postgres" />
        </ListItem>
      </List>
      <Typography variant="h2" sx={{ marginBottom: '2rem' }}>Contact</Typography>
      <Typography variant="body1" paragraph>
        For any inquiries or feedback, please feel free to reach out to me at:
      </Typography>
      <Typography variant="body1" component="div" sx={{ marginBottom: '1rem' }}>
        <Box component="span" fontWeight="bold">Email:</Box> SethBaxendell1@gmail.com
      </Typography>
      <Typography variant="body1" component="div" sx={{ marginBottom: '1rem' }}>
        <Box component="span" fontWeight="bold">Phone:</Box> 123-456-7890
      </Typography>
      <Typography variant="body1" paragraph>
        You can also find me on:
      </Typography>
      <Typography variant="body1" component="div" sx={{ marginBottom: '1rem' }}>
        <Box component="span" fontWeight="bold">GitHub:</Box> 
        <Link href="https://github.com/example" target="_blank" rel="noopener">
        https://github.com/sbaxend
        </Link>
      </Typography>
      <Typography variant="body1" component="div" sx={{ marginBottom: '1rem' }}>
        <Box component="span" fontWeight="bold">LinkedIn:</Box> 
        <Link href="www.linkedin.com/in/seth-baxendell-39b5a6268" target="_blank" rel="noopener">
        www.linkedin.com/in/seth-baxendell-39b5a6268
        </Link>
      </Typography>
  <Typography variant="h2" sx={{ marginBottom: '2rem' }}>Future Updates</Typography>
  <List>
    <ListItem>
      <ListItemText primary="Tracking Total expenses and charts" />
    </ListItem>
    <ListItem>
      <ListItemText primary="Adding Pictures" />
    </ListItem>
    <ListItem>
      <ListItemText primary="Share Feature to share a file when selling a vehicle" />
    </ListItem>
  </List>
      <Typography variant="h2" sx={{ marginBottom: '2rem' }}>Acknowledgments</Typography>
  <Typography variant="body1" paragraph>
    We would like to express our gratitude to the following individuals and organizations for their contributions and support in the development of this application:
  </Typography>
  <List>
    <ListItem>
      <ListItemText primary="Prime Academy(Teachers and Classmates)" />
    </ListItem>
    <ListItem>
      <ListItemText primary="Family" />
    </ListItem>
    <ListItem>
      <ListItemText primary="Friends" />
    </ListItem>
  </List>
</Container>
  )
}
export default InfoPage;