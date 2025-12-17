// Header scroll effect
const header = document.getElementById("header")
let lastScroll = 0

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 100) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }

  lastScroll = currentScroll
})

// Mobile menu toggle
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
const navLinks = document.querySelector(".nav-links")

mobileMenuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active")

  // Animate hamburger
  const spans = mobileMenuToggle.querySelectorAll("span")
  spans[0].style.transform = navLinks.classList.contains("active") ? "rotate(45deg) translateY(10px)" : "none"
  spans[1].style.opacity = navLinks.classList.contains("active") ? "0" : "1"
  spans[2].style.transform = navLinks.classList.contains("active") ? "rotate(-45deg) translateY(-10px)" : "none"
})

// Search toggle
const searchToggle = document.querySelector(".search-toggle")
const searchBar = document.querySelector(".search-bar")

searchToggle.addEventListener("click", () => {
  searchBar.classList.toggle("active")
})

// Category filter
const categoryTabs = document.querySelectorAll(".category-tab")
const productCards = document.querySelectorAll(".product-card")

categoryTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // Remove active class from all tabs
    categoryTabs.forEach((t) => t.classList.remove("active"))
    // Add active class to clicked tab
    tab.classList.add("active")

    const category = tab.dataset.category

    // Filter products with animation
    productCards.forEach((card, index) => {
      setTimeout(() => {
        if (category === "all" || card.dataset.category === category) {
          card.style.display = "block"
          card.style.animation = "fadeInUp 0.5s ease"
        } else {
          card.style.display = "none"
        }
      }, index * 50)
    })
  })
})

// Scroll to top button
const scrollToTopBtn = document.querySelector(".scroll-to-top")

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 500) {
    scrollToTopBtn.classList.add("visible")
  } else {
    scrollToTopBtn.classList.remove("visible")
  }
})

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })

      // Close mobile menu if open
      navLinks.classList.remove("active")
    }
  })
})

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe all sections
document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0"
  section.style.transform = "translateY(30px)"
  section.style.transition = "opacity 0.8s ease, transform 0.8s ease"
  observer.observe(section)
})

// Product card hover effects with parallax
const productImages = document.querySelectorAll(".product-image")

productImages.forEach((image) => {
  image.addEventListener("mousemove", (e) => {
    const rect = image.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20

    const img = image.querySelector("img")
    img.style.transform = `scale(1.1) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  })

  image.addEventListener("mouseleave", () => {
    const img = image.querySelector("img")
    img.style.transform = "scale(1.1)"
  })
})

// Newsletter form submission
const newsletterForm = document.querySelector(".newsletter-form")

newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const email = newsletterForm.querySelector("input").value

  if (email) {
    // Show success message
    const button = newsletterForm.querySelector("button")
    const originalText = button.textContent
    button.textContent = "✓ Subscribed!"
    button.style.background = "#10b981"

    setTimeout(() => {
      button.textContent = originalText
      button.style.background = ""
      newsletterForm.reset()
    }, 2000)
  }
})

// Add cart functionality with modal
const cartToggle = document.querySelector(".cart-toggle")
const cartCount = document.querySelector(".cart-count")
const cartModal = document.querySelector(".cart-modal")
const cartClose = document.querySelector(".cart-close")
const cartItemsList = document.querySelector(".cart-items-list")
const cartTotalPrice = document.querySelector(".cart-total-price")

const cart = []

// Create backdrop element
const backdrop = document.createElement("div")
backdrop.className = "cart-backdrop"
document.body.appendChild(backdrop)

// Toggle cart modal
cartToggle.addEventListener("click", () => {
  cartModal.classList.add("active")
  backdrop.classList.add("active")
  document.body.style.overflow = "hidden"
})

// Close cart modal
cartClose.addEventListener("click", closeCart)
backdrop.addEventListener("click", closeCart)

function closeCart() {
  cartModal.classList.remove("active")
  backdrop.classList.remove("active")
  document.body.style.overflow = ""
}

// Update cart display
function updateCartDisplay() {
  cartCount.textContent = cart.length

  if (cart.length === 0) {
    cartItemsList.innerHTML = `
      <div class="cart-empty">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <p>Your cart is empty</p>
      </div>
    `
    cartTotalPrice.textContent = "₹0"
    return
  }

  const cartHTML = cart
    .map(
      (item, index) => `
    <div class="cart-item">
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${item.price}</div>
      </div>
      <button class="cart-item-remove" data-index="${index}">×</button>
    </div>
  `,
    )
    .join("")

  cartItemsList.innerHTML = cartHTML

  // Calculate total
  const total = cart.reduce((sum, item) => {
    const price = Number.parseInt(item.price.replace(/[₹,]/g, ""))
    return sum + price
  }, 0)

  cartTotalPrice.textContent = `₹${total.toLocaleString("en-IN")}`

  // Add remove listeners
  document.querySelectorAll(".cart-item-remove").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = Number.parseInt(e.target.dataset.index)
      cart.splice(index, 1)
      updateCartDisplay()
    })
  })
}

// Add to cart functionality
document.querySelectorAll(".quick-view").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation()

    // Get product details from the card
    const productCard = btn.closest(".product-card")
    const productName = productCard.querySelector("h3").textContent
    const productPrice = productCard.querySelector(".price-current").textContent
    const productImage = productCard.querySelector(".product-image img").src

    // Add to cart array
    cart.push({
      name: productName,
      price: productPrice,
      image: productImage,
    })

    updateCartDisplay()

    // Animate cart icon
    cartToggle.style.animation = "none"
    setTimeout(() => {
      cartToggle.style.animation = "fadeInUp 0.5s ease"
    }, 10)

    // Change button text temporarily
    btn.textContent = "Added!"
    btn.style.background = "#10b981"

    setTimeout(() => {
      btn.textContent = "Quick View"
      btn.style.background = ""
    }, 1500)
  })
})

// Initialize cart display
updateCartDisplay()

// Lazy loading for images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.src
        img.classList.add("loaded")
        imageObserver.unobserve(img)
      }
    })
  })

  document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
    imageObserver.observe(img)
  })
}

// Add cursor trail effect for premium feel
const createCursorTrail = () => {
  const trail = document.createElement("div")
  trail.className = "cursor-trail"
  document.body.appendChild(trail)

  document.addEventListener("mousemove", (e) => {
    const trails = document.querySelectorAll(".cursor-trail")
    if (trails.length > 10) {
      trails[0].remove()
    }
  })
}

// Initialize animations on page load
window.addEventListener("load", () => {
  document.body.style.opacity = "1"
})

console.log("[v0] Kilangi Jewellery website loaded successfully")
