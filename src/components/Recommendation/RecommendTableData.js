import { Card } from '@mui/material'
import RecommendTable from './RecommendTable'

export default function RecommendTableData () {
  const data = [
    {
      subject: 'Cheese Sandwich',
      Image: '',
      title: 'Review product details',
      date: '9/7/2023',
      explanation:
        'The product is attractive in the menu, but customers are not ordering it. Please review your product photos, name and description, as the advertisement does not seem well aligned with the product.'
    },
    {
      subject: 'Cheese Sandwich',
      Image: '',
      title: 'Review product details',
      date: '9/7/2023',
      explanation:
        'The product is attractive in the menu, but customers are not ordering it. Please review your product photos, name and description, as the advertisement does not seem well aligned with the product.'
    },
    {
      subject: 'Cheese Sandwich',
      Image: '',
      title: 'Review product details',
      date: '9/7/2023',
      explanation:
        'The product is attractive in the menu, but customers are not ordering it. Please review your product photos, name and description, as the advertisement does not seem well aligned with the product.'
    },
    {
      subject: 'Cheese Sandwich',
      Image: '',
      title: 'Review product details',
      date: '9/7/2023',
      explanation:
        'The product is attractive in the menu, but customers are not ordering it. Please review your product photos, name and description, as the advertisement does not seem well aligned with the product.'
    },
    {
      subject: 'Cheese Sandwich',
      Image: '',
      title: 'Review product details',
      date: '9/7/2023',
      explanation:
        'The product is attractive in the menu, but customers are not ordering it. Please review your product photos, name and description, as the advertisement does not seem well aligned with the product.'
    },
    {
      subject: 'Cheese Sandwich',
      Image: '',
      title: 'Review product details',
      date: '9/7/2023',
      explanation:
        'The product is attractive in the menu, but customers are not ordering it. Please review your product photos, name and description, as the advertisement does not seem well aligned with the product.'
    },
    {
      subject: 'Cheese Sandwich',
      Image: '',
      title: 'Review product details',
      date: '9/7/2023',
      explanation:
        'The product is attractive in the menu, but customers are not ordering it. Please review your product photos, name and description, as the advertisement does not seem well aligned with the product.'
    },
    {
      subject: 'Cheese Sandwich',
      Image: '',
      title: 'Review product details',
      date: '9/7/2023',
      explanation:
        'The product is attractive in the menu, but customers are not ordering it. Please review your product photos, name and description, as the advertisement does not seem well aligned with the product.'
    }
  ]

  return (
    <Card>
      <RecommendTable tableItems={data ?? []} />
    </Card>
  )
}
