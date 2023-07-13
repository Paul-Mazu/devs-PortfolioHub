import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import placeholderImage from "../../images/contemplative-reptile.jpg";

// for reference: format of developer profile

// {
//   "id": 0,
//   "email": "user@example.com",
//   "profile_image": "string",
//   "name": "string",
//   "short_desc": "string",
//   "tags": [
//     {
//       "name": "string"
//     }
//   ],
//   "bio": "string",
//   "title": "string",
//   "address": "string",
//   "working_at": "string",
//   "status_open_to_work": true,
//   "github_link": "string",
//   "linkedin_link": "string",
//   "website_link": "string",
//   "xing_link": "string",
//   "whatsapp": "string",
//   "messenger": "string"
// }

export function DeveloperCard({developer}) {

  const checkImageUrl = (image) => {
    if (image === null) {
      return placeholderImage
    } else {
      return image
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="developer profile image"
        height="140"
        image={checkImageUrl(developer.profile_image)}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {developer.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {developer.bio}

        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
