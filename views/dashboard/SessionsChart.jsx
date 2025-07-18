'use client'
import * as React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
// import { LineChart } from "@mui/x-charts/LineChart";
import { LineChart } from '@mui/x-charts'
import useReferrals from './../../hooks/referral/useReferrals'
import { groupReferralsByDate } from './../../utils/groupReferralsByDate'

function AreaGradient({ color, id }) {
  return (
    <defs>
      <linearGradient id={id} x1='50%' y1='0%' x2='50%' y2='100%'>
        <stop offset='0%' stopColor={color} stopOpacity={0.5} />
        <stop offset='100%' stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  )
}

AreaGradient.propTypes = {
  color: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
}

function getDaysInMonth(month, year) {
  const date = new Date(year, month, 0)
  const monthName = date.toLocaleDateString('en-US', {
    month: 'short'
  })
  const daysInMonth = date.getDate()
  const days = []
  let i = 1
  while (days.length < daysInMonth) {
    days.push(`${monthName} ${i}`)
    i += 1
  }
  return days
}

export default function SessionsChart() {
  const { isLoading, referrals } = useReferrals()
  const referralsData = referrals?.data

  const datas = groupReferralsByDate(referralsData)
  const mappedData = datas?.map(el => el.referrals)

  const theme = useTheme()
  const data = getDaysInMonth(4, 2024)

  const colorPalette = [theme.palette.primary.light, theme.palette.primary.main, theme.palette.primary.dark]

  return (
    <Card variant='outlined' sx={{ width: '100%' }}>
      <CardContent>
        <Typography component='h2' variant='subtitle2' gutterBottom>
          Referral Link
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Stack
            direction='row'
            sx={{
              alignContent: { xs: 'center', sm: 'flex-start' },
              alignItems: 'center',
              gap: 1
            }}
          >
            <Typography variant='h4' component='p'>
              {referralsData?.length}
            </Typography>
            <Chip size='small' color='success' label={`total referrals`} />
          </Stack>
          <Typography variant='caption' sx={{ color: 'text.secondary' }}>
            Referrals per day for the last 30 days
          </Typography>
        </Stack>
        <LineChart
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'point',
              data,
              tickInterval: (index, i) => (i + 1) % 5 === 0
            }
          ]}
          series={[
            // {
            //   id: 'direct',
            //   label: 'Direct',
            //   showMark: false,
            //   curve: 'linear',
            //   stack: 'total',
            //   area: true,
            //   stackOrder: 'ascending',
            //   data: [
            //     300, 900, 600, 1200, 1500, 1800, 2400, 2100, 2700, 3000, 1800, 3300, 3600, 3900, 4200, 4500, 3900, 4800,
            //     5100, 5400, 4800, 5700, 6000, 6300, 6600, 6900, 7200, 7500, 7800, 8100
            //   ]
            // },
            {
              id: 'referral',
              label: 'Referral',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              area: true,
              stackOrder: 'ascending',
              data: mappedData
            }
            // {
            //   id: 'organic',
            //   label: 'Organic',
            //   showMark: false,
            //   curve: 'linear',
            //   stack: 'total',
            //   stackOrder: 'ascending',
            //   data: [
            //     1000, 1500, 1200, 1700, 1300, 2000, 2400, 2200, 2600, 2800, 2500, 3000, 3400, 3700, 3200, 3900, 4100,
            //     3500, 4300, 4500, 4000, 4700, 5000, 5200, 4800, 5400, 5600, 5900, 6100, 6300
            //   ],
            //   area: true
            // }
          ]}
          height={250}
          margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          sx={{
            '& .MuiAreaElement-series-organic': {
              fill: "url('#organic')"
            },
            '& .MuiAreaElement-series-referral': {
              fill: "url('#referral')"
            },
            '& .MuiAreaElement-series-direct': {
              fill: "url('#direct')"
            }
          }}
          slotProps={{
            legend: {
              hidden: true
            }
          }}
        >
          <AreaGradient color={theme.palette.primary.dark} id='organic' />
          <AreaGradient color={theme.palette.primary.main} id='referral' />
          <AreaGradient color={theme.palette.primary.light} id='direct' />
        </LineChart>
      </CardContent>
    </Card>
  )
}
