import { useState } from 'react';
import { View } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import FiltroCategoria from '../components/despesa/FiltroCategoria';

function TodasDespesas(){

    const [categoriaFiltro, setCategoriaFiltro] = useState('');

    const DUMMY_DESPESAS = [
        {
            id: '1',
            descricao: 'Conta de luz',
            valor: 100.99,
            data: new Date(2025, 2, 11),
            categoria: 'Contas'
        },
        {
            id: '2',
            descricao: 'Conta de Água',
            valor: 40.99,
            data: new Date(2025, 4, 10),
            categoria: 'Contas'
        },
        {
            id: '3',
            descricao: 'Supermercado',
            valor: 230.5,
            data: new Date(2025, 5, 2),
            categoria: 'Alimentação'
        },
        {
            id: '4',
            descricao: 'Uber',
            valor: 27.9,
            data: new Date(2025, 5, 8),
            categoria: 'Transporte'
        },
        {
            id: '5',
            descricao: 'Cinema',
            valor: 45,
            data: new Date(2025, 5, 14),
            categoria: 'Lazer'
        }
    ]

    function filtrarPorCategoria(despesas, categoria) {
        if (!categoria) {
            return despesas;
        }

        return despesas.filter(despesa => despesa.categoria === categoria);
    }

    const despesasFiltradas = filtrarPorCategoria(DUMMY_DESPESAS, categoriaFiltro);

    return (
        <View style={{ flex: 1 }}>
            <FiltroCategoria
                categoriaSelecionada={categoriaFiltro}
                onSelecionar={setCategoriaFiltro}
            />

            <DespesaSaida
                despesas={despesasFiltradas}
                periodo={categoriaFiltro ? 'Total - ' + categoriaFiltro : 'Total'}
            />
        </View>
    )
}

export default TodasDespesas