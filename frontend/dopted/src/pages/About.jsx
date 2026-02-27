export default function About() {
  return (
    <div className="px-12 py-16">

<div className="flex items-center justify-between gap-10">        <div className="w-1/2">
        <h1 className="text-3xl font-bold">About US</h1>

          <p className="mt-6 text-lg text-gray-600">
          Dopted! We are a platform dedicated to connecting pet adopters with shelters and rescue organizations.</p>
        </div>

         <div className="w-1/2">
          <img 
            src="/cat.jpg" 
            alt="Cat and owner high five"
            className="rounded-xl shadow-lg w-full object-cover"
          />
        </div>

       <div className="mt-16">
        <h2 className="text-2xl font-bold">Our Mission</h2>
        <p className="mt-4 text-gray-600 max-w-3xl">
          Our mission is to connect loving families with pets in need of a forever home. We strive to create a compassionate and supportive community where every pet can find a loving family.
        </p>
       </div>
      </div>
      
    </div>

  );
}