'use client'
import React, { useState } from 'react'
import { userStore } from './userStore'

function page() {
	const { users, setUsers } = userStore()

	console.log(users, '---')

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		gender: '',
		hobbies: {
			reading: false,
			sports: false,
			music: false,
		},
	})

	const [error, setError] = useState('')

	// Handle input change
	const handleChange = (e) => {
		const { name, value, type, checked } = e.target

		if (type === 'checkbox') {
			setFormData({
				...formData,
				hobbies: {
					...formData.hobbies,
					[name]: checked,
				},
			})
		} else {
			setFormData({
				...formData,
				[name]: value,
			})
		}
	}

	// Validate form inputs and checkboxes
	const validateForm = () => {
		const { name, email, gender, hobbies } = formData

		// Check if at least one checkbox is checked
		const atLeastOneChecked = Object.values(hobbies).some((val) => val)

		if (name.trim() === '' || email.trim() === '') {
			setError('Name and email cannot be blank')
			return false
		}

		if (!atLeastOneChecked) {
			setError('At least one hobby must be selected')
			return false
		}

		if (gender === '') {
			setError('Please select a gender')
			return false
		}

		setError('')
		return true
	}

	// Handle form submission
	const handleSubmit = (e) => {
		e.preventDefault()

		// Validate the form before submitting
		if (!validateForm()) {
			return
		}

		// Only include checked checkboxes
		const selectedHobbies = Object.keys(formData.hobbies).filter(
			(hobby) => formData.hobbies[hobby]
		)

		const formResponse = {
			name: formData.name,
			email: formData.email,
			gender: formData.gender,
			hobbies: selectedHobbies,
		}

		// Display form response
		console.log('Form submitted:', formResponse)
		setUsers(formResponse)
	}

	return (
		<div className='flex flex-col items-center'>
			<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
				<h1 className='text-lg font-bold'>React Form</h1>

				{/* Text inputs */}
				<div>
					<label>Name:</label>
					<input
						type='text'
						name='name'
						value={formData.name}
						onChange={handleChange}
						className='border p-2 rounded-md w-full text-gray-950'
					/>
				</div>

				<div>
					<label>Email:</label>
					<input
						type='email'
						name='email'
						value={formData.email}
						onChange={handleChange}
						className='border p-2 rounded-md w-full text-gray-950'
					/>
				</div>

				{/* Radio buttons */}
				<div>
					<label>Gender:</label>
					<div>
						<label>
							<input
								type='radio'
								name='gender'
								value='Male'
								checked={formData.gender === 'Male'}
								onChange={handleChange}
							/>
							Male
						</label>
						<label>
							<input
								type='radio'
								name='gender'
								value='Female'
								checked={formData.gender === 'Female'}
								onChange={handleChange}
								className='ml-4'
							/>
							Female
						</label>
					</div>
				</div>

				{/* Checkboxes */}
				<div>
					<label>Hobbies:</label>
					<div>
						<label>
							<input
								type='checkbox'
								name='reading'
								checked={formData.hobbies.reading}
								onChange={handleChange}
							/>
							Reading
						</label>

						<label>
							<input
								type='checkbox'
								name='sports'
								checked={formData.hobbies.sports}
								onChange={handleChange}
								className='ml-4'
							/>
							Sports
						</label>

						<label>
							<input
								type='checkbox'
								name='music'
								checked={formData.hobbies.music}
								onChange={handleChange}
								className='ml-4'
							/>
							Music
						</label>
					</div>
				</div>

				{/* Error message */}
				{error && <p className='text-red-500'>{error}</p>}

				{/* Submit button */}
				<button
					type='submit'
					className='p-2 bg-blue-500 text-white rounded-md'
				>
					Submit
				</button>
			</form>
		</div>
	)
}

export default page
