document.addEventListener('DOMContentLoaded', function () {
	// Функция для переключения содержимого
	function toggleContent() {
		const contentButtonsContainer = document.querySelector(
			'.content-buttons-container'
		)
		const arrow = document.querySelector('.content-header .arrow')

		contentButtonsContainer.classList.toggle('open')
		arrow.style.transform = contentButtonsContainer.classList.contains('open')
			? 'rotate(180deg)'
			: 'rotate(0deg)'
	}

	// Функция для плавной прокрутки к разделам
	function scrollToSection(sectionId) {
		const section = document.getElementById(sectionId)
		if (section) {
			section.scrollIntoView({ behavior: 'smooth' })
			// Закрытие содержимого после прокрутки
			document
				.querySelector('.content-buttons-container')
				.classList.remove('open')
			document.querySelector('.content-header .arrow').style.transform =
				'rotate(0deg)'
		}
	}

	// Назначение обработчиков клика для заголовка содержания
	const contentHeader = document.querySelector('.content-header')
	if (contentHeader) {
		contentHeader.addEventListener('click', toggleContent)
	}

	// Назначение обработчиков клика для кнопок содержимого
	const contentButtons = document.querySelectorAll('.content-button')
	if (contentButtons) {
		contentButtons.forEach(button => {
			button.addEventListener('click', function () {
				const sectionId = button
					.getAttribute('onclick')
					.replace("scrollToSection('", '')
					.replace("')", '')
				scrollToSection(sectionId)
			})
		})
	}

	// Открытие фото в лайтбоксе
	const photos = document.querySelectorAll('.gallery-photo')
	const lightbox = document.getElementById('lightbox')
	const lightboxImg = document.getElementById('lightbox-img')
	const close = document.querySelector('.close')
	const prev = document.querySelector('.prev')
	const next = document.querySelector('.next')

	let currentPhotoIndex = 0

	photos.forEach((photo, index) => {
		photo.addEventListener('click', () => {
			lightbox.style.display = 'block'
			lightboxImg.src = photo.src
			currentPhotoIndex = index
		})
	})

	close.addEventListener('click', () => {
		lightbox.style.display = 'none'
	})

	prev.addEventListener('click', () => {
		changeImage(-1)
	})

	next.addEventListener('click', () => {
		changeImage(1)
	})

	function changeImage(direction) {
		currentPhotoIndex += direction
		if (currentPhotoIndex < 0) {
			currentPhotoIndex = photos.length - 1
		} else if (currentPhotoIndex >= photos.length) {
			currentPhotoIndex = 0
		}
		lightboxImg.src = photos[currentPhotoIndex].src
	}
})
