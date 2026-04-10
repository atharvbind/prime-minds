# 🧠 Prime Minds

## 📌 Project Overview

**Prime Minds** is a web application that allows users to explore some of the greatest mathematicians in history. The app fetches real-time data from the Wikipedia API and displays it in a clean, interactive card-based interface.

---

## 🎯 Purpose

This project is built to demonstrate:

* JavaScript fundamentals
* API integration using `fetch`
* Use of array higher-order functions (map, filter, sort)
* Responsive UI design using CSS

---

## 🌐 API Used

The application uses the **Wikipedia API** to fetch data about mathematicians, including:

* Name
* Image (or initials avatar if unavailable)
* Short description

Two Wikipedia endpoints are used:
* `Category API` — to fetch lists of Indian, American and British mathematicians
* `REST Summary API` — to fetch individual mathematician details

---

## ✨ Features

### 🔍 Search
* Search mathematicians by name using the search bar
* Auto-suggestions appear as you type using `.filter()` on the loaded list
* Falls back to Wikipedia's opensearch API if no local match is found

### 🔃 Sort
* Sort the displayed cards:
  * A → Z alphabetically
  * Z → A alphabetically
  * Random shuffle
* Implemented using `.sort()` with `localeCompare()`

### 🃏 Random Cards on Load
* 20 random mathematician cards are displayed on page load
* Shuffled using `.sort(() => Math.random() - 0.5)`
* Cards show image or initials avatar if no image is available

### 🌗 Dark / Light Mode
* Toggle between dark and light theme
* Dark mode styled with orange accents inspired by Project Euler

---

## 🛠️ Technologies Used

* HTML5
* CSS3
* JavaScript (ES6+)
* Wikipedia Fetch API

---

## 📱 Responsiveness

The application is fully responsive and works on:

* Mobile
* Tablet
* Desktop

---

## 🔗 Live Demo



---