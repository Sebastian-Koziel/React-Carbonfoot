import { Accordion, AccordionDetails, AccordionSummary, Container, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";

const faqs = [
    {
      question: 'Do kogo skierowana jest platforma buycoffee.to i jaki jest jej cel?',
      answer: 'Buycoffee.to to platforma dla wszystkich osób, które tworzą wartościowe treści w Internecie (min. na blogach, Instagramie, Facebooku, YouTube itd.) i chcą rozwijać swoją działalność w niezależny sposób. Buycoffee.to umożliwia Twojej społeczności finansowe wsparcie tego, co robisz, w formie postawienia Ci wirtualnej kawy.'
    },
    {
      question: 'W jaki sposób Wspierający może skorzystać z serwisu?',
      answer: 'Detailed answer for the question.'
    },
    {
      question: 'Czy korzystanie z serwisu wiąże się z opłatami?',
      answer: 'Detailed answer for the question.'
    },
    // ...other questions
  ];

const Questions = () => {

    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <Container sx={{width:"70%"}}>
      <Typography variant="h5" sx={{ my: 4, textAlign: 'center' }}>
        Najczęściej zadawane pytania
      </Typography>
      {faqs.map((faq, index) => (
        <Accordion 
        key={index}
        expanded={expanded === `panel${index}`}
        onChange={handleChange(`panel${index}`)}
        sx={{
            borderBottom: 1, // Sets a bottom border
            borderColor: 'grey.300', // Sets the border color
            boxShadow: 'none', // Removes the shadow
            '&:before': { // Removes the default Material-UI inset shadow
              display: 'none',
            },
            
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}a-content`}
            id={`panel${index}a-header`}
          >
            <Typography>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  )
}

export default Questions