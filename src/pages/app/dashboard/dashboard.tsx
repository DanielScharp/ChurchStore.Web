import { api } from '@/services/api'

import { Helmet } from 'react-helmet-async'
import { MonthRevenueCard } from './month-revenue-card'
import { MonthOrdersAmountCard } from './month-orders-amount-card'
import { DayOrdersAmountCard } from './day-orders-amount-card'
import { MonthCanceledOrdersAmountCard } from './mounth-canceled-orders-amount-card'
import { RevenueChart } from './revenue-chart'
import { PopularProductsChart } from './popular-products-chart'
import { useEffect } from 'react'


export function Dashboard(){

    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(()=> {
        api.get('')
    })

    return(
        <>
            <Helmet title='Dashboard' />
            <div className='flex flex-col gap-4'>
                <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>

                <div className='grid grid-cols-4 gap-4'>
                    <MonthRevenueCard />
                    <MonthOrdersAmountCard />
                    <DayOrdersAmountCard />
                    <MonthCanceledOrdersAmountCard />
                </div>

                <div className='grid grid-cols-9 gap-4'>
                    <RevenueChart />
                    <PopularProductsChart />
                </div>
            </div>
        </>
    )
}