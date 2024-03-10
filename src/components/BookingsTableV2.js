import React from 'react'
import { useEffect } from 'react'
import Icon from './Icon'

const BookingsTableV2 = ({ list_bookings }) => {

    useEffect(() => {
        console.log("Hello from bookings tables v2 ", list_bookings)
    }
        , [list_bookings])

    return (
        <div className='flex flex-col'>
            <div className='w-full inline-block align-middle' >
                <div className='overflow-hidden border'>
                    <table className='divide-y divide-gray-200'>
                        <thead className='bg-gray-50'>
                            <tr>
                                <th
                                    scope='col'
                                    className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
                                >
                                    Booking ID
                                </th>
                                <th
                                    scope='col'
                                    className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
                                >
                                    Guest Info
                                </th>
                                <th
                                    scope='col'
                                    className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
                                >
                                    Room Type (Days)
                                </th>
                                <th
                                    scope='col'
                                    className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
                                >
                                    Visit, Purpose
                                </th>
                                <th
                                    scope='col'
                                    className='px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase'
                                >
                                    <div className='flex items-center'>
                                        Check-in
                                        <Icon icon='forward' />
                                        Check-out
                                    </div>
                                </th>
                                <th
                                    scope='col'
                                    className='px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase '
                                >
                                    Status
                                </th>
                                <th
                                    scope='col'
                                    className='px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase '
                                >
                                    Payment
                                </th>
                                <th
                                    scope='col'
                                    className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
                                >
                                    Comment
                                </th>

                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200'>
                            {list_bookings.map((
                                booking
                            ) => (
                                <tr key={booking.booking_id}>
                                    <td className='px-6 py-4 text-sm font-medium whitespace-nowrap'>
                                        {booking.booking_id}
                                    </td>

                                    <td className='px-6 py-4 text-sm font-medium whitespace-nowrap'>
                                        {booking.guest_name}
                                    </td>

                                    <td className='px-6 py-4 text-sm font-medium whitespace-nowrap'>
                                    </td>


                                </tr>))}

                        </tbody>




                    </table>



                </div>


            </div>
        </div>
    )
}

export default BookingsTableV2