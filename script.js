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

// Add cart functionality
const cartToggle = document.querySelector(".cart-toggle")
const cartCount = document.querySelector(".cart-count")
let itemCount = 0

document.querySelectorAll(".quick-view").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation()
    itemCount++
    cartCount.textContent = itemCount

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
