import * as React from 'react'

export default function Footer(){
    return(
        <>
        <footer className="bg-gray-900 text-white py-6">
  <div className="container mx-auto flex justify-between">
    <div className="flex flex-col">
      <h3 className="text-lg font-bold mb-2">Contact Us</h3>
      <p className="mb-2">123 Main Street</p>
      <p className="mb-2">New York, NY 10001</p>
      <p className="mb-2">Phone: (123) 456-7890</p>
      <p>Email: info@company.com</p>
    </div>
    <div className="flex flex-col">
      <h3 className="text-lg font-bold mb-2">Links</h3>
      <ul className="list-none">
        <li className="mb-2"><a href="#">Home</a></li>
        <li className="mb-2"><a href="#">About Us</a></li>
        <li className="mb-2"><a href="#">Services</a></li>
        <li className="mb-2"><a href="#">Contact Us</a></li>
      </ul>
    </div>
    <div className="flex flex-col">
      <h3 className="text-lg font-bold mb-2">Follow Us</h3>
      <ul className="list-none">
        <li className="mb-2"><a href="#"><i className="fab fa-facebook"></i> Facebook</a></li>
        <li className="mb-2"><a href="#"><i className="fab fa-twitter"></i> Twitter</a></li>
        <li className="mb-2"><a href="#"><i className="fab fa-instagram"></i> Instagram</a></li>
        <li className="mb-2"><a href="#"><i className="fab fa-linkedin"></i> LinkedIn</a></li>
      </ul>
    </div>
  </div>
  <div className="bg-gray-800 py-2">
    <div className="container mx-auto text-center">
      <p className="text-sm">&copy; 2023 Company, Ltd. All Rights Reserved.</p>
    </div>
  </div>
</footer>
        </>
    )
}
