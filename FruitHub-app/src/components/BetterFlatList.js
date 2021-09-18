import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, Text, SafeAreaView, View, Alert } from 'react-native';
import { colors, Default } from '../../assets/styles/StyleGuide';
import { useScrollToTop } from '@react-navigation/native';
import EmptyContent from './EmptyContent';

export default function BetterFlatList(props) {

	if (!props.getList || !props.renderItem) {
		return (<Text>Necessário informar os paramentros getList e renderItem</Text>);
	}

	const { getList, renderItem, emptyMessage, errorMessage, renderHeader, secondText, typeEmpty, mt0, noticias } = props;

	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [refreshing, setRefreshing] = useState(false);
	const [loadingMore, setLoadingMore] = useState(false);
	const [data, setData] = useState([]);
	const [isFinish, setIsFinish] = useState(false);
	const [banner, setBanner] = useState(null);

	const ref = useRef(null);

	useScrollToTop(ref);

	useEffect(() => {
		setLoading(true);

		getList({ ...props.filter, page: currentPage }).then(async (res) => {
			setData(res.data.data);
			setCurrentPage(res.data.current_page + 1);

			if (res.data.per_page > res.data.data.length) {
				setIsFinish(true);
				setCurrentPage(1);
			}

			if (noticias && res.data.data.length > 0) {
				setBanner(res.data.data[0]);

				res.data.data.splice(0, 1);

				setData(res.data.data);
			}
		}).catch(async () =>
			Alert.alert('Ops!', errorMessage || 'Ocorreu um erro ao buscar os dados.')
		).finally(async () => setLoading(false));
	}, []);

	const handleLoadMore = () => {
		if (loading || loadingMore) return;

		setLoadingMore(true);

		getList({ ...props.filter, page: currentPage }).then(async (res) => {
			setData(e => [...e, ...res.data.data]);

			if (res.data.per_page == res.data.data.length) {
				setCurrentPage(res.data.current_page + 1);
			} else {
				setIsFinish(true);
				setCurrentPage(1);
			}
		}).catch(() =>
			Alert.alert('Ops!', errorMessage || 'Ocorreu um erro ao buscar os dados.')
		).finally(() =>
			setLoadingMore(false)
		);
	};

	const onRefresh = () => {
		setRefreshing(true);

		getList({ ...props.filter, page: 1 }).then(async (res) => {
			setData(res.data.data);
			setCurrentPage(res.data.current_page + 1);
			setIsFinish(false);

			if (noticias && res.data.data.length > 0) {
				setBanner(res.data.data[0]);

				res.data.data.splice(0, 1);

				setData(res.data.data);
			}
		}).catch(() =>
			Alert.alert('Ops!', errorMessage || 'Ocorreu um erro ao buscar os dados.')
		).finally(() =>
			setRefreshing(false)
		);
	};

	const renderEmptyList = () => (((!noticias && !banner) || (noticias && !banner)) ? <EmptyContent text={emptyMessage} typeEmpty={typeEmpty} secondText={secondText} mt0={mt0} /> : null);

	const renderFooter = () => (
		loadingMore ? <ActivityIndicator size='large' color={colors.primaryDefault} style={{ paddingVertical: 20, backgroundColor: '#FFF', }} /> : null
	);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			{loading ?
				<View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#FFF' }}>
					<ActivityIndicator color={colors.primaryDefault} size='large' />
				</View>
				:
				<FlatList ref={ref} data={data} renderItem={({ item }) => renderItem(item)} showsVerticalScrollIndicator={false} keyExtractor={item => `Key_${item.id}`} style={Default.container}
					ListHeaderComponent={(item) => noticias ? renderHeader(banner) : renderHeader(item) || null} ListEmptyComponent={renderEmptyList} ListFooterComponent={renderFooter} onEndReached={!isFinish ? handleLoadMore : null}
					onEndReachedThreshold={0.5} initialNumToRender={5} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} />
			}
		</SafeAreaView>
	);
}