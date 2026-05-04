import { hotel } from './data/hotel'
import { useStickyChrome } from './hooks/useStickyChrome'
import { Header } from './components/Header'
import { SearchBar } from './components/SearchBar'
import { Breadcrumb } from './components/Breadcrumb'
import { HotelHeader } from './components/HotelHeader'
import { PhotoGallery } from './components/PhotoGallery'
import { SmallAmenities } from './components/SmallAmenities'
import { AboutHotel } from './components/AboutHotel'
import { Disponibilidade } from './components/Disponibilidade'
import { Reviews } from './components/Reviews'
import { AmenitiesGrid } from './components/AmenitiesGrid'
import { Schedules } from './components/Schedules'
import { Policies } from './components/Policies'
import { Footer } from './components/Footer'

function App() {
  useStickyChrome()
  return (
    <>
      <Header />
      <SearchBar
        hotelName={hotel.name}
        dates={hotel.query.dates}
        guests={hotel.query.guests}
      />
      <Breadcrumb items={hotel.breadcrumb} />
      <HotelHeader
        name={hotel.name}
        address={hotel.address}
        stars={hotel.stars}
        rating={hotel.rating}
        ratingLabel={hotel.ratingLabel}
        reviewsCount={hotel.reviewsCount}
      />
      <PhotoGallery photos={hotel.heroPhotos} extraCount={hotel.extraPhotosCount} />
      <SmallAmenities items={hotel.smallAmenities} />
      <AboutHotel about={hotel.about} pointsOfInterest={hotel.pointsOfInterest} />
      <Disponibilidade hotel={hotel} />
      <Reviews block={hotel.reviews} />
      <AmenitiesGrid hotelName={hotel.name} categories={hotel.amenities} />
      <Schedules hotelName={hotel.name} schedules={hotel.schedules} />
      <Policies hotelName={hotel.name} policies={hotel.policies} />
      <Footer />
    </>
  )
}

export default App
