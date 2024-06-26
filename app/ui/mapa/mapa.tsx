// app/ui/mapa/mapa.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchReferencialesForMap } from '../../lib/mapData';

type Point = {
    id: string; // Asumiendo que cada punto tiene un identificador único
    geom: [number, number];
};

const Mapa = () => {
    const [data, setData] = useState<Point[]>([]);

    useEffect(() => {
        fetchReferencialesForMap()
            .then(response => {
                const points = response.map((point, index) => {
                    // Asumiendo que el backend no proporciona un ID, usamos el índice como fallback
                    const uniqueId = point.id || `point-${point.geom.join('-')}`;
                    return {
                        ...point,
                        id: uniqueId,
                        geom: [point.geom[1], point.geom[0]] // Invertir las coordenadas
                    };
                });
                setData(points);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    return (
        <MapContainer center={[-39.8142, -73.2459]} zoom={13} style={{ height: "100vh", width: "100vw" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {data.map((point, index) => (
                <CircleMarker
                key={point.id} // Usar el ID único como clave
                center={point.geom}
                radius={20}
                />
            ))}
        </MapContainer>
    );
};

export default Mapa;