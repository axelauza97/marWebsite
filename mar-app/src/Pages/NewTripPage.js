import React from "react";
import TripForm from "../components/Trips/TripForm";
import { getAuthToken } from "../components/util/auth";
import { json, redirect } from "react-router";

function NewTripPage() {
    return <TripForm />
}
export default NewTripPage;

export async function action({ request, params }) {
    const method = request.method;
    const data = await request.formData();
    const token = getAuthToken();
    const tripId = params.tripId;

    if (method === 'DELETE') {
        const response = await fetch('http://localhost:8080/events/' + tripId, {
            method: request.method,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        if (!response.ok) {
            throw json({ message: 'Could not delete event.' }, {
                status: 500,
            });
        }
        return redirect('/');
    }

    const eventData = {
        title: data.get('title'),
        body: data.get('body'),
        image: data.get('image'),
        button: data.get('button')
    };
    let url = 'http://localhost:8080/events';
    if (method === 'PATCH') {
        url = 'http://localhost:8080/events/' + tripId;
    }

    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(eventData),
    });

    if (response.status === 422) {
        return response;
    }

    if (!response.ok) {
        throw json({ message: 'Could not save event.' }, { status: 500 });
    }

    return redirect('/');
}