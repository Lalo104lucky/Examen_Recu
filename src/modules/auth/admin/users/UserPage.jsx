/**
 * r
 * a
 * f
 * c
 * e
 */
import { Button, Badge } from 'flowbite-react';
import React, { useMemo } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import AxiosClient from '../../../../config/http-gateway/http-client';
import TableComponent from '../../../../components/TableComponent';
import { LiaEdit, LiaTrashRestoreSolid, LiaTrashSolid } from "react-icons/lia";
import { Card, Label, TextInput } from 'flowbite-react/lib/esm';
import { FaSearch } from "react-icons/fa";


// # Es la numeración de nuestros registros

const UserPage = () => {
    const [loadin, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [filterText, setFilterText] = useState("");
    const columns = useMemo(() => [
        {
            name: "#",
            cell: (row, index) => <>{index + 1}</>,
            sortable: true,
            selector: (row, index) => index + 1,
        },
        {
            name: "Usuario",
            cell: (row, index) => <>{row.username}</>,
            sortable: true,
            selector: (row, index) => row.username,
        },
        {
            name: "Rol",
            cell: (row, index) => <>{row.roles[0].name}</>,
            sortable: true,
            selector: (row, index) => row.roles[0].name,
        },
        {
            name: "Estado",
            cell: (row) => <Badge color={row.status ? 'success' : 'failure'}>
                {row.status ? 'Activo' : 'Inactivo'}
            </Badge>,
            selector: () => row.status,
            sortable: true,
        },
        {
            name: "Acciones",
            cell: (row) => (
                <>
                    <div className="flex gap-2 p-2">
                    <Button outline pill color='warning' size={'sm'}>
                        <LiaEdit />
                    </Button>
                    <Button color={row.status ? 'failure' : 'success'} outline pill size={'sm'}>
                        {row.status ? <LiaTrashSolid /> : <LiaTrashRestoreSolid />}
                    </Button>
                    </div>
                </>
            ),
        },
    ]);

    const getUsers = async () => {
        try {
            setLoading(true);
            const response = await AxiosClient({
                url: "/user/",
                method: "GET",
            });
            console.log(response);
            if (!response.error) {
                setUsers(response.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const filter = () => {
        return users.filter((user) => {
           return user.username.includes(filterText)
        })
    }

    return (
        <>
            <section className="flex flex-col pt-4 px-3">
                <div>
                    <h4 className='text-2x1'>Usuarios</h4>
                </div>
                <div className='flex w-full justify-between'>
                    <div className="max-w-md">
                            <Label htmlFor="search" value="Buscar" />
                        <TextInput id="search" type="text" rightIcon={FaSearch } placeholder="Buscar..."  
                            onChange={(e) => setFilterText(e.target.value)}
                            value={filterText}
                        />
                    </div>
                    <div className='flex items-center'>
                    <Button pill outline color='success'>AGREGAR</Button>
                    </div>
                </div>
                <Card>
                    <TableComponent columns={columns} data={filter()} progress={loadin} />
                </Card>
            </section>
        </>
    )
}

export default UserPage

