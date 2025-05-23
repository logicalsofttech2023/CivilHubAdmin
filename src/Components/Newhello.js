import React from 'react'
import './newsidebar.css'
const Newhello = () => {
  return (
    <div className=''>

    <div>
  <div className="menu-btn">
    <i className="fas fa-bars" />
  </div>
  <div className="side-bar">
    <header>
      <div className="close-btn">
        <i className="fas fa-times" />
      </div>
      <img src="https://lh3.googleusercontent.com/a-/AOh14Gj99VObFyE8W_h8RrcwZO_aYiIHu5AAa_XpnOym=s600-k-no-rp-mo" alt />
      <h1>Mystery Code</h1>
    </header>
    <div className="menu">
      <div className="item"><a href="#"><i className="fas fa-desktop" />Dashboard</a></div>
      <div className="item">
        <a className="sub-btn"><i className="fas fa-table" />Tables<i className="fas fa-angle-right dropdown" /></a>
        <div className="sub-menu">
          <a href="#" className="sub-item">Sub Item 01</a>
          <a href="#" className="sub-item">Sub Item 02</a>
          <a href="#" className="sub-item">Sub Item 03</a>
        </div>
      </div>
      <div className="item"><a href="#"><i className="fas fa-th" />Forms</a></div>
      <div className="item">
        <a className="sub-btn"><i className="fas fa-cogs" />Settings<i className="fas fa-angle-right dropdown" /></a>
        <div className="sub-menu">
          <a href="#" className="sub-item">Sub Item 01</a>
          <a href="#" className="sub-item">Sub Item 02</a>
        </div>
      </div>
      <div className="item"><a href="#"><i className="fas fa-info-circle" />About</a></div>
    </div>
  </div>
  <section className="main">
    <h1>Sidebar Menu With<br />Sub-Menus</h1>
  </section>
</div>


    </div>
  )
}

export default Newhello
