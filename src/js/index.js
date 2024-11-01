const { createHigherOrderComponent, } = window.wp.compose;
const { Fragment, }                   = window.wp.element;
const { InspectorControls, }          = window.wp.editor;
const { PanelBody, }                  = window.wp.components;
const { __, }                         = window.wp.i18n

const sidebarControls = createHigherOrderComponent( ( BlockEdit ) => {

	return ( props ) => {

		// Save the prop to this block
		function setUsers( value ) {

			const users = [];
			const options = value.target.options;

			for ( let i = 0; i < options.length; i++ ) {

				if ( options[ i ].selected ) {
					users.push( options[ i ].value );
				}

			}

			props.setAttributes( {
				ubvUserRestriction: users,
			} );

		}

		// Empty array to store markup for options
		let options = [
			<option value="ubv-not-logged-in">{ __( 'User Not Logged In', 'user-block-visibility' ) }</option>,
			<option value="ubv-logged-in">{ __( 'User Logged In', 'user-block-visibility' ) }</option>,
		];

		Object.keys( UBV_USER_ROLE_VISIBILITY.roles ).map( function( key ) {

			const selected = props.attributes.ubvUserRestriction.includes( key );

			options.push( <option selected={ selected ? 'selected' : '' } value={ key }>{ UBV_USER_ROLE_VISIBILITY.roles[ key ] }</option> );

		} );

		// Print the sidebar
		return (
			<Fragment>
				<BlockEdit { ...props } />
				<InspectorControls>
					<PanelBody
						className="user-block-visibility"
						title={ __( 'User Block Visibility', 'user-block-visibility' ) }
					>
						{ __( 'Hide from these users:', 'user-block-visibility' )}
						<select
							onChange={ setUsers }
							multiple="true"
						>{ options }</select>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	};

}, "withInspectorControl" );

wp.hooks.addFilter( 'editor.BlockEdit', 'user-block-visibility/sidebar-controls', sidebarControls );

//
// Add a filter to store extra props on blocks
//
wp.hooks.addFilter(
	'blocks.registerBlockType',
	'user-block-visibility/extra-props',
	extraProps
);

function extraProps( props ) {

	if ( props.attributes ) { // Some modules don't have attributes

		props.attributes = Object.assign(
			props.attributes,
			{
				ubvUserRestriction: {
					type: 'array',
					default: [],
				}
			}
		);

	}

	return props;

}
